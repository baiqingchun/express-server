
exports.fail = (code, message, next) => {
    // throw new Error('程序发生了未知错误！')
    next({code, message});
}
exports.pass = (msg, data, next) => {
    next({code: 200, msg, data})
}
