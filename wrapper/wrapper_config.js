/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/7
 */
var logger = require('ss-logger').getLogger(__filename);
var M_config = require('../model/model_config');
var config_json = require('../config/game_config');

var wrapper_mail = module.exports;

wrapper_mail.init = function() {
	init_config("1.0.0", 'template');
}

wrapper_mail.get_common = function(version, channel, callback) {
	var key = version + ":" + channel;
	var default_key = version + ":template";
	M_config.get(key, function(err, reply) {
		if (err) {
			return callback(err);
		}
		if (reply) {
			var reply_obj = JSON.parse(reply);
			callback(err, reply_obj.common);
		} else {
			M_config.get(default_key, function(err, reply) {
				if (err) {
					return callback(err);
				}
				var reply_obj = JSON.parse(reply);
				callback(err, reply_obj.common);
			});
		}
	});
}

wrapper_mail.get_notice = function(version, channel, callback) {
	var key = version + ":" + channel;
	var default_key = version + ":template";
	M_config.get(key, function(err, reply) {
		if (err) {
			return callback(err);
		}
		if (reply) {
			var reply_obj = JSON.parse(reply);
			callback(err, reply_obj.notice);
		} else {
			M_config.get(default_key, function(err, reply) {
				if (err) {
					return callback(err);
				}
				var reply_obj = JSON.parse(reply);
				callback(err, reply_obj.notice);
			});
		}
	});
}

wrapper_mail.get_activity = function(version, channel, callback) {
	var key = version + ":" + channel;
	var default_key = version + ":template";
	M_config.get(key, function(err, reply) {
		if (err) {
			return callback(err);
		}
		if (reply) {
			var reply_obj = JSON.parse(reply);
			callback(err, reply_obj.activity);
		} else {
			M_config.get(default_key, function(err, reply) {
				if (err) {
					return callback(err);
				}
				var reply_obj = JSON.parse(reply);
				callback(err, reply_obj.activity);
			});
		}
	});
}


//------------------------INTERNAL FUNCTIONS----------------------------
function init_config(version, channel) {
	var key = version + ":" + channel;
	M_config.get(key, function(err, reply) {
		if (err) {
			logger.error(err);
		}
		if (!reply) {
			M_config.set(key, JSON.stringify(config_json), function(e) {
				if (e) {
					logger.error(e);
				}
			});
		}
	});
}