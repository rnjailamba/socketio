var modules = require('./setup/all_modules');//require all modules that are shared by all controllers
var router = modules.express.Router();
var config = require('../config/config.js');//require all modules that are shared by all controllers
var appConfig = require('../config/appConfig'); // configure service api urls in dev/prod/beta

var redisClient = require('../helpers/exporters/export_redisClient').redisClient;
modules.winston.log('debug', 'Hello again distributed log files!');


process.on('uncaughtException', function(err) {
    log.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    log.error(err.stack)
    process.exit(1)
});


// PING
// ============================================== 
router.get('/axy', function(req, res){
  
    res.render('chat1', { title: 'Express' });

});
router.get('/ping', function(req, res){
  
    res.render('chat', { title: 'Express' });

});


module.exports.router = router;
