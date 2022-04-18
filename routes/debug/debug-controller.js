const MG = require('./db.js');
let Test;
const _jwt = require(process.cwd()+'/auth').jwt
const _msg = require(process.cwd()+'/base').msg
MG.OnConnected(function () {
    Test = MG.db.Test
});
exports.setup = (app) => {
    app.get('/error', async function (req, res, next) {
        _msg.fail('400','no user',next)
    });
    app.get('/success', async function (req, res, next) {
        let list = [1,23]
        _msg.pass('success',list,next)
    });
    app.get('/test', async function (req, res, next) {
        await Test.insertOne({name: 'aaaa'})
        let list = await Test.find()
        res.send(list);
    });
    app.post('/test2', async function (req, res, next) {

        res.send('test2');
    });

}
