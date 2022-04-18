const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const secret = 'secret12345'
exports.init = (app)=>{
    app.use(expressJwt({
        secret: secret,  // 签名的密钥 或 PublicKey
        algorithms: ['HS256'],
        getToken: function fromHeaderOrQuerystring (req,payload) {
            if (req.headers.authorization ) {
                return req.headers.authorization;
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
    }).unless({
        path: ['/login', '/signup','/user']  // 指定路径不经过 Token 解析
    }))

}
exports.setJwt = (user)=>{
    const token = jwt.sign(
        {
            _id: user._id,
            // admin: user.role === 'admin'
        },
        secret,
        {
            expiresIn: 3600 * 24 * 3,
        }
    )
    return token


}
