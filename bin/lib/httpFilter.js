class HttpFilter {
    constructor(app) {
        this.app = app;
        this.filter()
    }
    filter() {
        this.app.use(function (info, req, res, next) {
            res.json(info)
            return true;
        });
    }
}
module.exports = HttpFilter;
