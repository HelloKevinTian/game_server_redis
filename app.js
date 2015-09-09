/**
 *  @ game_server启动入口文件
 */
var fs = require('fs');
var cluster = require('cluster');
var app = require('ss-server');

global.CONST = require('./util/const');
global.UTIL = require('./util/util');

/*
 * @ config	
 */
app.configure('server', 'config/server.json');
app.configure('handle', 'config/handle.json');

/*
 * @ model目录模块必须在子进程中启动！
 */
var model_files = fs.readdirSync('./model/');
for (var i = 0; i < model_files.length; i++) {
	require('./model/' + model_files[i]).config('config/redis.json');
};

/*
 * @ wrapper目录模块涉及游戏初始化动作，必须仅在主进程中启动一次！
 */
if (cluster.isMaster) {
	var wrapper_files = fs.readdirSync('./wrapper/');
	for (var i = 0; i < wrapper_files.length; i++) {
		require('./wrapper/' + wrapper_files[i]).init();
	};
}

/*
 * @ 启动服务器，主进程负责负载均衡，子进程负责处理客户端消息	
 */
app.start();