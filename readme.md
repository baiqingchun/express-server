# express-server
> 基于 express 的框架
# 部署
```
yarn install
yarn run start
```
# 框架
- node 框架：express
- 数据库：mongolass
# 目录
## auth
- jwt.js :token 验证，采用
- mongo_base.js:mongo链接 基础文件
- verify ：用户token 验证拦截，根据 token，再检查数据查看用户是否存在
## base
> 后台框架基础定义
## public
静态文件存储位置

## src
> 后台逻辑文件，这个文件操作最多，有个两个例子目录，debug、user，如果后面要加逻辑，仿照这两个目录来写。
- debug-service.js：逻辑文件，接口定义文件
```
  app.get('/test', async function (req, res, next) {
        await Test.insertOne({name: 'aaaa'})
        let list = await Test.find()
        res.send(list);
    });
```
- db.js：数据库文件
```
const db = require(process.cwd() + '/auth').db;
exports.OnConnected =require(process.cwd() + '/auth').OnConnected;
const add_index = require(process.cwd() + '/auth').add_index;

const onConnect = function () {
    const mongolass = db.mongolass;

    //===============GYRO RELATED==================


    db.Test = mongolass.model('Test',{
        videoId: {type:'string'},   // video ID
        name: {type:'string'},   // video ID


        date:{type:'date'}          // Send date time

    });
    //
    // add_index(db.Test, {videoId:1});

};

exports.OnConnected(onConnect);
exports.db = db;

```
## socketio
> socketio后台定义，对应 public 下的message.html、 socketio.html

## config
> 数据库连接目录，后台端口定义

## server.js
> 后台初始化

```
const http = require('http');
const conn = require('./config.js').conn;
const portserver = require('./config.js').portserver;
const app = require(process.cwd() + '/bin').setup_dev(['.'],
    'GVR Server');
const server = http.createServer(app);
const socketIo = require('./socketio/index')
socketIo.init(server)

require(process.cwd() + '/auth').connectDB(conn);

server.listen(portserver, () => {
    console.log('listening on *:',portserver);
});


```
![image](./public/image/zan.jpg)
