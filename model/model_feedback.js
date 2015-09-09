/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/20 	
 */
var redis = require('ss-redis');
var fs = require('fs');
var logger = require('ss-logger').getLogger(__filename);

//=============================INFO================================

var model_feedback = module.exports;
var redis_name = 'pool_feedback'; // redis对象池名字
var table_name = 'h_feedback'; // 表名
var backup_table_name = 'h_feedback_backup'; //备份表

//=============================API=================================

model_feedback.config = function(config) {
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

model_feedback.get_all = function(callback) {
	redis.execute(redis_name, function(client, release) {
		client.hgetall(table_name, function(err, result) {
			release();
			callback(err, result);
		});
	});
};

model_feedback.get = function(key, callback) {
	redis.execute(redis_name, function(client, release) {
		client.hget(table_name, key, function(err, result) {
			release();
			callback(err, result);
		});
	});
};

model_feedback.set = function(key, value, callback) {
	redis.execute(redis_name, function(client, release) {
		client.hset(backup_table_name, key, value, function(err, result) {
			if (err) {
				logger.error(err);
			}
		});
		client.hset(table_name, key, value, function(err, result) {
			release();
			callback(err, result);
		});
	});
};

model_feedback.delete_all = function(callback) {
	redis.execute(redis_name, function(client, release) {
		client.del(table_name, function(err, result) {
			release();
			callback(err, result);
		});
	});
}

model_feedback.delete = function(key, callback) {
	redis.execute(redis_name, function(client, release) {
		client.hdel(table_name, key, function(err, result) {
			release();
			callback(err, result);
		});
	});
}