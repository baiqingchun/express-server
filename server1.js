const express = require('express');
const app = express();
const http = require('http');
// 设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
const server1 = http.createServer(app);
const socketIo = require('./socketio/index')
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});
app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/html/message.html');
});
app.get('/test', function(req, res, next) {
    res.send('respond with a resource');
});
socketIo.init(server1)
server1.listen(3000, () => {
    console.log('listening on *:3000');
});
