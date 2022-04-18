// Usage:
// mongo.User.find().exec().then()
// mongo.User.insertOne({name: 'abc', password: 'bbbddd', ...}).exec().then();

const Mongolass = require('mongolass');
exports.Mongolass = Mongolass
exports.Schema = Mongolass.Schema;
const mongolass = new Mongolass();

const Promise = require('bluebird');

exports.db = { mongolass: mongolass };
const db = exports.db;

let connected = [];
exports.OnConnected = function (fn) {
    if (fn) {
        connected.push(fn);
    }
};

const index_operations = [];

exports.add_index = function (table, indexJson, isUnique) {
    if (isUnique) {
        index_operations.push(table.index(indexJson, {unique: true}).exec());
    } else {
        index_operations.push(table.index(indexJson).exec());
    }
    /*else if(time){
            //数据过期时间，这个索引为微信公众号的access_token过期设定的，慎用，用了之后数据在time后悔消失。
            index_operations.push(table.index(indexJson,{expireAfterSeconds:time,unique: true}).exec());
        }*/
};

//'mongodb://localhost:27017/db1'
//'mongodb://root:Bdclab123@dds-2ze29c61c95941c42.mongodb.rds.aliyuncs.com:3717,dds-2ze29c61c95941c41.mongodb.rds.aliyuncs.com:3717/admin?replicaSet=mgset-3297869'
exports.connectDB = function (conn) {
    return mongolass.connect(conn).then(function () {
        console.log('MongoDB Connectted');



        connected.forEach(function (oneFn) {
            if (oneFn) {
                oneFn();
            }
        });

        return Promise.all(index_operations);
    });

};

