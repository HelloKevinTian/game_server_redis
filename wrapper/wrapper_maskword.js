/**
 * @ Author Kevin
 * @ Email  tianwen@chukong-inc.com
 * @ 2015/8/5 	
 */
var async = require('async');
var logger = require('ss-logger').getLogger(__filename);
var M_maskword = require('../model/model_maskword');
var maskword_json = require('../config/maskword');
var cluster = require('cluster');
var nodejieba = require("nodejieba");

var wrapper_maskword = module.exports;

wrapper_maskword.init = function() {
	var maskword_len = maskword_json.length;
	var count = 0;
	async.whilst(
		function() {
			return count < maskword_len;
		},
		function(callback) {
			M_maskword.set(maskword_json[count], 1, function(err) { // 1为任意指定的一个非0value
				count++;
				callback(err);
			})
		},
		function(err) {
			if (err) {
				logger.error(err);
			} else {
				logger.info('SET MASKWORD OK!!! ', cluster.isMaster);
			}
		}
	);
}

/*
	wrapper_maskword.filter("我是拖拉机学院手TMD扶拖拉机专TMD业的。",function(err,new_sentence) {
		logger.info(new_sentence);
	});	
 */
wrapper_maskword.filter = function(sentence,callback) {
	var new_sentence = sentence || '';
	var word_list = nodejieba.cut(new_sentence);
	var i = 0;
	async.whilst(
		function() {
			return i < word_list.length;
		},
		function(cb) {
			M_maskword.get(word_list[i], function(err, result) {
				if (result) { // result==1 代表含有不合法词
					word_list[i] = Array(word_list[i].length + 1).join("*");
				}
				i++;
				cb(err);
			});
		},
		function(err) {
			var ret_sentence = word_list.join('');
			callback(err,ret_sentence);
		}
	);
}