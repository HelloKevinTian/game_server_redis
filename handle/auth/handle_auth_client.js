var logger = require('ss-logger').getLogger(__filename);
var _ = require('underscore');
var async = require('async');

function handle(clientip, msg, next) {
	console.log("auth_client ok!!!");

	var a = [1, 2, 3];
	var b = _.max(a);

	console.log(a, b);

	var count = 0;
	async.whilst(
		function() {
			return count < 3
		},
		function(cb) {
			console.log('1.1 count: ', count);
			count++;
			setTimeout(cb, 1000);
		},
		function(err) {
			// 3s have passed
			console.log('1.1 err: ', err);
		}
	);


	next("ip: " + clientip + "   msg: " + JSON.stringify(msg));
};

module.exports = {
	'handle': handle
};