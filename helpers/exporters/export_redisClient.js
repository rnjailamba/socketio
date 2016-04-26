var redisClient;
var redisPubClient;
var redisSubClient;
module.exports.setRedisClient = function(inClient,redisPubClient,redisSubClient) { 
	redisClient = inClient; 
	redisPublisherClient = redisPubClient;
	redisSubscriberClient = redisSubClient;
	module.exports.redisClient = redisClient;
	module.exports.redisPublisherClient = redisPublisherClient;
	module.exports.redisSubscriberClient = redisSubscriberClient;
};


