const _file = require('./file');
const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const path = require('path')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const httpFilter = require('./httpFilter')
const createServer = function (options) {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(bodyParser.json({limit: '50mb'}));
    // console.log(__dirname,process.cwd() )
    app.use(express.static(path.join(process.cwd(), 'public')));
    // 允许跨域 /
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        // res.header("X-Powered-By",' 3.2.1')
        if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
        else next();
    });
    app.use((req, res, next) => {
        console.log('api url::', req.body, req.body.a)
        next()
    })

    return app;
};
exports.init_app = function (options) {

    if (typeof options === 'string') {
        options = {name: options};
    }

    let server1 = createServer(options);
    let files = _file.walk('.', '', ['node_modules', 'example', '.git', 'dest', '.idea', 'public']);
    files.forEach(function (oneFile) {
        if (oneFile.endsWith('-controller.js')) {
            setupFile(oneFile, app);
        }
    })
    new httpFilter(app)
    return server1;
};
const setupFile = function (file, server) {
    server.base_path = '';

    if (file[0] !== '/') {
        file = process.cwd() + '/' + file;
    }

    console.log('Setup: ' + file);
    require(file).service(server);

};
