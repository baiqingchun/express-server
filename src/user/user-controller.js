const MG = require('./db.js');
let User;
const _jwt = require(process.cwd()+'/auth').jwt
MG.OnConnected(function () {
    User = MG.db.User
});
exports.service = (app) => {
    app.get('/user', async function (req, res, next) {
        res.send('user');
    });
    app.post('/login',async function (req,res){
        let body = req.body
        let user = await User.insertOne(body)
        user = user.ops[0]
        let token = _jwt.setJwt(user)
        return res.json({
            status: 'ok',
            data: { token: token }
        })
    })
}
