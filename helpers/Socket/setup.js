var app = require("express");  
var server = require("http").Server(app);  
var io = require("socket.io")(server);
console.log("in socket");

var index = require('../../controllers/index.js');
index.setIOobject(io);