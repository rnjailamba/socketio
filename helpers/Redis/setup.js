var redis = require('redis');
var redisClient = redis.createClient();
var redisPubClient = redis.createClient();
var redisSubClient = redis.createClient();
//creates a new client
console.log("redis is initialized");

var export_redisClient = require('../exporters/export_redisClient.js');
export_redisClient.setRedisClient(redisClient,redisPubClient,redisSubClient);

