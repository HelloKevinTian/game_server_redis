/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/6/12     
 */
var logger = require('ss-logger').getLogger(__filename);
var M_mail = require('../../model/model_mail');

function handle(clientip, msg, next) {
    var ret = {
        'code': CONST.CODE.SUCCESS
    };

    M_mail.get_all(function(err, data) {
        if (err) {
            logger.error(err);
            ret.code = CONST.CODE.UNKNOWN_ERROR;
        } else {
            ret.mail_list = data;
        }
        next(ret);
    });
};

module.exports = {
    'handle': handle
};