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
const init_server = function (server) {
    server.g_api = []

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(bodyParser.json({limit: '50mb'}));
    // console.log(__dirname,process.cwd() )
    app.use(express.static(path.join(process.cwd(), 'public')));
    // 允许跨域 /
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        // res.header("X-Powered-By",' 3.2.1')
        if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
        else  next();
    });
    app.use((req, res, next) => {
        console.log('api url::' ,req.body,req.body.a)
        next()
    })
}
const createServer = function (options) {
    if (!options.name) options.name = 'GVR';

    if (options.key_file) {
        options.key = fs.readFileSync(options.key_file);
    }

    if (options.cert_file) {
        options.certificate = fs.readFileSync(options.cert_file);
    }

    if (options.ca_file) {
        options.ca = fs.readFileSync(options.ca_file);
    }
    init_server( app, options.name);

    return app;
};
exports.setup_dev = function (folders, options) {

    if (typeof options === 'string') {
        options = {name: options};
    }

    let server1 = createServer(options);

    folders.forEach(function (oneFolder) {
        let files = _file.walk(oneFolder, '', ['node_modules', 'example', '.git', 'dest', '.idea']);
        files.forEach(function (oneFile) {

            if (oneFile.endsWith('-controller.js')) {
                setupFile(oneFile, app, options.custom_folder ? oneFolder : '');
            }
        })
    });
    new httpFilter(app)
    return server1;
};
const setupFile = function (file, server, custom_folder) {
    server.base_path = '';
    if (custom_folder) {
        let r = path.relative(custom_folder, file);

        if (r.substring(0, 3) === '../') {
            let ind = r.indexOf('/', r.indexOf('/') + 1);
            r = r.substring(ind + 1);
        }
        server.base_path = 'c/' + r.substring(0, r.indexOf('/'));
    }

    if (file[0] !== '/') {
        file = process.cwd() + '/' + file;
    }

    console.log('Setup: ' + file);
    require(file).setup(server);

};
