var io = require('../exporters/export_socketIO').io;
var redisClient = require('../exporters/export_redisClient').redisClient;
var redisPublisherClient  = require('../exporters/export_redisClient').redisPublisherClient ;
var redisSubscriberClient = require('../exporters/export_redisClient').redisSubscriberClient ;

var MESSAGE_CONST = "MESSAGE";
var GROUP_CONST = "GROUP";
var SET_CONST = "SET";
var USER_GROUP_CONST = "USER:GROUP";
var GROUP_PARTICIPANT_CONST = "GROUP:PARTICIPANT"


redisSubscriberClient.subscribe('Individual');
redisSubscriberClient.on('message', function(channel, message) {
    if (channel == 'Individual') {
        console.log(message);
        var msg = JSON.parse(message);
        io.to(msg.user).emit('chat message', msg.message);
    }
  /*  if (channel == 'group') {
        console.log(message);
        var msg = JSON.parse(message);
        redis_client.lrange(GROUP_PARTICIPANT_CONST + ":" + msg.group, 0, -1, function(err, reply) {
            reply.forEach(function(item) {
                if (item != msg.message.sender) {
                    log.info(item);
                    io.to(item).emit(item, msg.message);
                }
            });
        });
    }
    */
});


io.on('connection', function (socket) {

	console.log("user connected");
    
    console.log(socket.id);
    socket.on('set user', function(request) {
       // log.info(request);
        //log.info(request.token);
        console.log(request);
        socket.join(request);
        var response = {
            "isSuccess": true
        };
        socket.emit("registered",  JSON.stringify(response));
        //log.info(response);
    });

    socket.on('chat message', function(message) {
        //var msg = JSON.parse(message);
        var msg = message;
        console.log(msg);
        var sendRequest = {
           "user": "raj",
           "message": message
        };
        redisPublisherClient.publish("Individual", JSON.stringify(sendRequest));
        //io.to(msg.user).emit("chat message", "hello");
        });

});
/*
     socket.on('create_group', function(request) {

        createGroup(request);

    });



 socket.on('rename_group', function(request) {
        //maintain current name mapping to original name
    });
   

    socket.on('add_member', function(request) {
        //add new participant => roomname will also change
    });

*/
/*
    socket.on('chat message', function(msg) {
        //incoming message should have both sender, receiver, message, senderName to display, timestamp from server handle regions/timezome diff
        console.log(msg);
        //io.emit(msg.sender, msg.chat_message);
        validateUser(msg.sender, msg.token, function(response) {
            if (response == true) {
                messageSent(msg);
            }
        });
*/
        /*  msg.events="SENT";
          msg.type="NEW";*/
        /*  client.publish('instance',JSON.stringify({user:msg.receiver,message:msg}))
          io.emit(msg.sender+msg.receiver+msg.sendermessageId, msg);*/
          /*
    });


    socket.on('message_delivered', function(msg) {
        messageDelivered(msg);
        msg.events = "DELIVERED";
        msg.type = "ACK";
        redis_client.publish('instance', JSON.stringify({
            user: msg.sender,
            message: msg
        }));
    });


    socket.on('message_delivered_ack', function(msg) {
        messageDeliveredAcknowledged();
    });


    socket.on('message_sent', function(msg) {
        messageSent();
    });


    socket.on('message_read', function(msg) {
        messageRead();
        msg.events = "READ";
        msg.type = "ACK";
        redis_client.publish('instance', JSON.stringify({
            user: msg.sender,
            message: msg
        }));
    });



    socket.on('message_read_ack', function(msg) {
        messageReadAcknowledged();
    });



    socket.on('fetch_history', function(msg) {
        console.log('request to fetch history');
        console.log(msg);
        validateUser(msg.sender, msg.token, function(response) {
            if (response == true) {
                fetchHistoryRangeV2(msg);
            }
        });
    });


    socket.on('fetch_rooms', function(request) {
        console.log('request to fetch rooms');
        console.log(request);
        validateUser(request.user, request.token, function(response) {
            if (response == true) {
                getUserRooms(request.user, request.start, request.token);
            }
        });

    });


    socket.on('get_group', function(request) {
        console.log('request to get group');
        console.log(request);

        validateUser(request.sender, request.token, function(response) {
            if (response == true) {
                //console.log("valid user");
                getExistingRoomForUsers(request, function(reply) {
                    if (reply == true) {
                        //      console.log("creating room ");
                        createDirectRoom(request.sender, request.receiver);
                    }
                });
            }
        });
        //  getRoomName(request.receiver,request.sender); 
        // getUserRoom(request.user, request.start,request.token);
    });


    socket.on('disconnect', function(){
    console.log('user disconnected');
  });


});

function validateUser(user, token, callback) {
    client.hget("USER:TOKEN:HASH", token, function(err, response) {
        //console.log(token);
        console.log(response);
        if (response == user) {
            return callback(true);
        } else {
            return callback(false);
        }

        //if (response == )

    });
}
/*
function createGroup(request) {
        console.log("request to create group");
        console.log(request);
        var groupRequest = JSON.parse(request);
        var users = groupRequest.users;
        var groupName = groupRequest.groupName;
        redis_client.multi();
        users.forEach(function(item) {
            redis_client.rpush(GROUP_PARTICIPANT_CONST + ":" + room, item, function(err, reply) {

            });
        });
        redis_client.exec(function(err, reply) {
            io.to(request.sender).emit(request.sender + ':CURRENTGROUP', {
                "group": groupName
            });
            console.log("added participants");
        });
}



/**
 * get groups a user belong to 
 * @param {string} user
 * @param {string} start
 * @param {string} token
 * @param {string} limit
 * @return {array|int} groups and count of total room
 * this method returns 10 rooms before the starting point  
 */
 /*
function getUserRooms(user, start, token, limit) {
    if (!start) {
        start = getTime();
    }
    client.zrevrangebyscore(USER_ROOMS_CONST + ":" + user, start, '-inf', 'WITHSCORES', 'LIMIT', 0, 10, function(err, response) {
        if (!err) {
            client.zcount(USER_ROOMS_CONST + ":" + user, '-inf', '+inf', function(err, reply) {
                if (!err) {
                    var array = [];
                    if (response) {
                        for (var i = 0; i < response.length; i = i + 2) {
                            var arr = response[i].toString().split(":");
                            var room_name=response[i];
                            if(arr[1]==user){
                                room_name=arr[2];
                            }
                            else{
                                room_name=arr[1];
                            }
                            var room = {
                                "room_id": response[i],
                                "room_name": room_name,
                                "time": response[i + 1]
                            };
                            array.push(room);
                        }
                    }
                    var rooms = {
                        "rooms": array,
                        "count": reply
                    };
                    console.log(rooms);
                    io.to(user).emit(user + ':Rooms', rooms);
                }
            });
        }
    });
}

function getExistingRoomForUsers(request, callback) {
    client.exists(getRoomName(request.receiver, request.sender), function(err, reply) {
        if (reply == 1) {
            io.to(request.sender).emit(request.sender + ':CURRENTROOM', {
                "room": getRoomName(request.receiver, request.sender)
            });
            return callback(false);
        } else {
            return callback(true);
            //io.to(request.sender).emit(request.sender + ':CURRENTROOM', {});
        }
    });
}

function getRooms(user, start, end, token) {
    var rooms = client.zrange(USER_ROOMS_CONST + ":" + user, start, end);
    io.to(user).emit(user + ':Rooms', JSON.parse(rooms));
}


function getTime() {
    var date = new Date();
    return date.getTime();
}





*/
/*
function generateMessageId() {
    return uuid.v1();
}

function messageSent(msg) {
    console.log(msg);
    //io.emit('chat message', msg.chat_message);
    msg.messageId = generateMessageId();
    msg.messageMap = MESSAGE_CONST; //getMessageMap(msg.sender,msg.receiver);
    //insert in redis message map
    msg.state = "SENT";
    msg.timestamp = getTime();
    if (!msg.room) {
        var room = getRoomName(msg.sender, msg.receiver);
        msg.room = room;
    }


    client.multi();
    client.hset(msg.messageMap, msg.messageId, JSON.stringify(msg));
    client.rpush(msg.room, JSON.stringify(msg));
    client.zadd(USER_ROOMS_CONST + ":" + msg.sender, msg.timestamp, msg.room);
    client.lrange(ROOM_PARTICIPANT_CONST + ":" + msg.room, 0, -1, function(err, reply) {
        reply.forEach(function(item) {
            if (item != msg.sender) {
                client.zadd(USER_ROOMS_CONST + ":" + item, msg.timestamp, msg.room);
            }
        });
    });
    //client.hset("HASH:MESSAGE:"+, msg.messageId,JSON.stringify(msg));
    client.zadd(getSetName(msg.sender, "SENT"), msg.timestamp, JSON.stringify({
        messageId: msg.messageId,
        type: "ACK",
        events: "SENT"
    }));
    //client.zadd(getSetNameOld(msg.receiver), msg.timestamp,JSON.stringify({messageId:msg.messageId, type:"NEW"}));
    client.exec(function(response) {
        msg.events = "SENT";
        msg.type = "NEW";
        client.publish('room', JSON.stringify({
            room: msg.room,
            message: msg
        }));
        io.to(msg.sender).emit(msg.sender + msg.sendermessageId, msg);
        //get uuid for user, 

    });
    */