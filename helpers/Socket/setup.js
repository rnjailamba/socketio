var exportedApp = require('../exporters/export_app');
var http = require("http");
var server = http.Server(exportedApp.app);
var io = require("socket.io")(server);
console.log("socket io client created");
// io.on('connection', function(socket){
//   console.log('a user connected original');
// });
server.listen(3001);
var export_socketIO = require('../exporters/export_socketIO.js');
export_socketIO.setSocketIO(io);

var socketAPI = require('./api.js');