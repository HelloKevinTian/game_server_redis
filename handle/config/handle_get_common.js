/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/20
 */
var logger = require('ss-logger').getLogger(__filename);
var W_config = require('../../wrapper/wrapper_config');

function handle(clientip, msg, next) {
	var ret = {
		'code': CONST.CODE.SUCCESS
	};
	W_config.get_common(msg.version, msg.channel, function(err, result) {
		if (err) {
			logger.error(err);
			ret.code = CONST.CODE.UNKNOWN_ERROR;
		}
		ret.result = result;
		next(ret);
	});
};

module.exports = {
	'handle': handle
};