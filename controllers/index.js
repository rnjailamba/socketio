var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta
var mappings = appConfig();

var redisClient;
module.exports.setRedisClient = function(inClient) { redisClient = inClient; };



modules.winston.log('debug', 'Hello again distributed log files!');


// PING
// ============================================== 
router.get('/ping', function(req, res){
    res.status(200).send("Ping");
});



var justPrintSomething = function(){
    console.log("print something");
}

module.exports.router = router;
