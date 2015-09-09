/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/7 	
 */
var redis = require('ss-redis');
var fs = require('fs');
var logger = require('ss-logger').getLogger(__filename);

//=============================INFO================================

var model_config = module.exports;
var redis_name = 'pool_config'; // redis对象池名字
var table_name = 'h_game_config'; // 表名

//=============================API=================================

model_config.config = function(config) {
	if (typeof config === 'string') {
		config = JSON.parse(fs.readFileSync(config, 'utf8'));
	}
	var opts = {
		'name': redis_name,
		'host': config.host,
		'port': config.port,
		'proxy': config.proxy
	};
	redis.createRedis(opts);
};

model_config.get_all = function(callback) {
	redis.execute(redis_name, function(client, release) {
		client.hgetall(table_name, function(err, result) {
			release();
			callback(err, result);
		});
	});
};

model_config.get = function(key, callback) {
	redis.execute(redis_name, function(client, release) {
		client.hget(table_name, key, function(err, result) {
			release();
			callback(err, result);
		});
	});
};

model_config.set = function(key, value, callback) {
	redis.execute(redis_name, function(client, release) {
		client.hset(table_name, key, value, function(err, result) {
			release();
			callback(err, result);
		});
	});
};

model_config.delete_all = function(callback) {
	redis.execute(redis_name, function(client, release) {
		client.del(table_name, function(err, result) {
			release();
			callback(err, result);
		});
	});
}

model_config.delete = function(key, callback) {
	redis.execute(redis_name, function(client, release) {
		client.hdel(table_name, key, function(err, result) {
			release();
			callback(err, result);
		});
	});
}