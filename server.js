const http = require('http');
const conn = require('./config.js').conn;
const portserver = require('./config.js').portserver;
const app = require(process.cwd() + '/base').setup_dev(['.'],
    'GVR Server');
const server = http.createServer(app);
const socketIo = require('./socketio/index')
socketIo.init(server)

require(process.cwd() + '/auth').connectDB(conn);

server.listen(portserver, () => {
    console.log('listening on *:',portserver);
});

