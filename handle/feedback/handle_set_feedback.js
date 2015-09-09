/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/6     
 */
var logger = require('ss-logger').getLogger(__filename);
var M_feedback = require('../../model/model_feedback');

function handle(clientip, msg, next) {
    var ret = {
        'code': CONST.CODE.SUCCESS
    };

    var mail = {
        guid: msg.player_guid,
        version: msg.version,
        channel: msg.channel,
        title: msg.title,
        content: msg.content
    };

    M_feedback.set(Date.now(), JSON.stringify(mail), function(err, result) {
        if (err) {
            logger.error(err);
        }
    });

    next(ret);
};

module.exports = {
    'handle': handle
};