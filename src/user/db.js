const db = require(process.cwd() + '/auth').db;
exports.OnConnected =require(process.cwd() + '/auth').OnConnected;
const add_index = require(process.cwd() + '/auth').add_index;

const onConnect = function () {
    const mongolass = db.mongolass;

    //===============GYRO RELATED==================


    db.User = mongolass.model('User',{
        name: {type:'string'},   // 用户名称

        date:{type:'date'}          // Send date time

    });
    //
    // add_index(db.Test, {videoId:1});

};

exports.OnConnected(onConnect);
exports.db = db;
