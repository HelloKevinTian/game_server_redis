/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/20
 */
var logger = require('ss-logger').getLogger(__filename);

function handle(clientip, msg, next) {
	var ret = {
		'code': CONST.CODE.SUCCESS
	};
	ret.time = Date.now();
	ret.date = UTIL.formatDate();
	next(ret);
};

module.exports = {
	'handle': handle
};