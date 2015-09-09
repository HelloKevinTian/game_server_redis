/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/6
 */
var cluster = require('cluster');
var logger = require('ss-logger').getLogger(__filename);
var nodemailer = require('nodemailer');
var M_feedback = require('../model/model_feedback');
var feedback_json = require('../config/feedback');
var CronJob = require('cron').CronJob;

var wrapper_mail = module.exports;

wrapper_mail.init = function() {
	// batch_send() // start crontab
}

//------------------------INTERNAL FUNCTIONS----------------------------
/*
 * 每周的周一至周五 9:00:00 AM 发送玩家反馈邮件
 */
function batch_send() {
	new CronJob('00 00 9 * * 1-5', function() {
			logger.info('Start to send feedback mail to chukong-inc');
			get_mail();
		}, function() {
			logger.info('Feedback mail crontab job stops now! ==>This function is executed when the job stops');
		},
		true, // 直接开始执行调度
		'Asia/Shanghai' //时区
	);
}

function get_mail() {
	M_feedback.get_all(function(err, result) {
		if (err) {
			logger.error(err);
		}
		if (result) {
			process_send('我是车神玩家邮件反馈', JSON.stringify(result), null);
			M_feedback.delete_all(function(e, ret) {
				if (e) {
					logger.error(e);
				}
			});
		} else {
			logger.warn('There is no feedback mail at the time.')
		}
	});
}

function process_send(subject, text, html) {
	var subject = subject || 'Hello ✔';
	var text = text || 'Hello ✔';
	var html = html || '<b>Hello ✔</b>'

	var transporter = nodemailer.createTransport("SMTP", {
		service: feedback_json.service,
		auth: {
			user: feedback_json.user,
			pass: feedback_json.pass
		}
	});

	var mailOptions = {
		from: feedback_json.from,
		to: feedback_json.to,
		subject: subject,
		text: text,
		html: html
	};

	transporter.sendMail(mailOptions, function(err, info) {
		if (err) {
			return logger.error(err);
		}
		logger.info('Message sent sucess: ' + info.message);
	});
}