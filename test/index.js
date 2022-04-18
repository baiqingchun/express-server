const express = require('express'); //express框架模块
const path = require('path'); //系统路径模块
const app = express();

const hostName = '127.0.0.1'; //ip
const port = 8080; //端口

app.use(express.static(path.join(__dirname, 'public'))); //指定静态文件目录
app.get('/index', (req, res) => {
    // 创建一个错误实例并抛出
    throw new Error('程序发生了未知错误！')
})

app.use((err, req, res, next) => {
    // 为客户端响应500状态码以及提示信息
    res.status(500).send(err.message)
})
app.listen(port, hostName, function() {
    console.log(`服务器运行在http://${hostName}:${port}`);
});
