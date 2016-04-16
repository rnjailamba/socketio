var io = require('../exporters/export_socketIO').io;

io.on('connection', function (socket) {
	console.log("user connected");
    socket.on('chat message', function (data) {
        console.log(data);
    });
    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


