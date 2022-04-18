const DB = require('./mongo_base.js').db;
const _jwt = require('./jwt.js')
const _msg = require(process.cwd()+'/bin').msg
const init = (app)=>{
    app.use(async (req, res, next) => {
        console.log('verify.js::' ,req.user)
        if(!req.user)next()
        else{
            let user = await DB.User.findOne({_id: req.user._id})
            if(!user)  _msg.fail(400,'no user',next)
            console.log(user)
            next()
        }

    })
}
exports.service = (app) => {
    _jwt.init(app)
    init(app)
}




