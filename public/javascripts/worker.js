
importScripts('./common/socket.io.js');


var connections = 0; // count active connections
var socket ;
self.addEventListener("connect", function (e) {
	if(!socket){
	 	socket= io.connect('http://localhost:3001');
	}
	function getTime(timestamp){
         var d = new Date(timestamp);
         return d.toLocaleString();
       }
     var port = e.ports[0];
	 connections++;

	port.addEventListener("message", function (e) {
		var request = JSON.parse(e.data);
		if(request.action =='set user'){
			 socket.emit('set user', request.user);
			 port.postMessage("User set");
		}
		if(request.action == 'chat message'){
             socket.emit('chat message', request.message);
             port.postMessage("sended");
		}
		
		//console.log(e.data);
		//console.log("message");
	}, false);

	port.start();

}, false);