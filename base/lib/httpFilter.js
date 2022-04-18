class HttpFilter {
    constructor(app) {
        this.app = app;
        this.filter()
    }
    filter() {
        this.app.use(function (info, req, res, next) {
            res.json(info)
          // res.status(500).send('服务器发生未知错误');
          // res.end()
          //   res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
          //   res.write(JSON.stringify({code: 'sssss'}));
          //   res.end();

            return true;
        });
    }
}
module.exports = HttpFilter;
