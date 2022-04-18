const { Server } = require("socket.io");
exports.init = (http_server)=>{
    const io = new Server(http_server,{
        allowEIO3: true,
        cors: {
            credentials: true
        }
    });
    io.on('connection', async (socket) => {
        // console.log('a user connected');

        let all =await io.of("/").allSockets();
        io.emit('total', all.size);//
        console.log('[' + (new Date()).toUTCString() + '] game connecting,users:',all.size);
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });

        socket.on('message', (room, data)=>{
            console.log('message:',room,data)
            if(room){
                socket.to(room).emit('message', data);
            }else{
                io.emit('message', data);
            }
            // socket.to(room).emit('message', room, data)//房间内所有人,除自己外
        });

        //该函数应该加锁
        socket.on('join',async (room)=> {
            socket.join(room);
            console.log('join room socket :',socket.id);
            let oflist = io.of("/")
            let myRoom =await io.of("/").in(room).allSockets();

            // console.log('in room list:',myRoom)
            // console.log('all sockets:',all)
            // var myRoom = io.sockets.adapter.rooms.get[room];
            var users = myRoom.size;

            console.log('the number of user in room is: ' +room+"::"+ users);

            //在这里可以控制进入房间的人数,现在一个房间最多 2个人
            //为了便于客户端控制，如果是多人的话，应该将目前房间里
            //人的个数当做数据下发下去。
            if(users < 300) {
                socket.emit('joined', room, socket.id);
                if (users > 1) {
                    socket.to(room).emit('otherjoin', room);//除自己之外
                }
            }else {
                socket.leave(room);
                socket.emit('full', room, socket.id);
            }
            //socket.to(room).emit('joined', room, socket.id);//除自己之外
            //io.in(room).emit('joined', room, socket.id)//房间内所有人
            //socket.broadcast.emit('joined', room, socket.id);//除自己，全部站点
        });

        socket.on('leave', async (room)=> {
            let users = await io.of("/").in(room).allSockets();

            console.log('the number of user in room is: ' + (users-1));

            socket.leave(room);
            socket.to(room).emit('bye', room, socket.id)//房间内所有人,除自己外
            socket.emit('leaved', room, socket.id);
            //socket.to(room).emit('joined', room, socket.id);//除自己之外
            //io.in(room).emit('joined', room, socket.id)//房间内所有人
            //socket.broadcast.emit('joined', room, socket.id);//除自己，全部站点
        });


        socket.on('disconnect', async (data) => {
            let users = await io.of("/").allSockets()
            io.emit('total', users.size);//
            console.log('[' + (new Date()).toUTCString() + '] Bye, client ' + socket.id,',user number:'+users.size);
        });


    });
}
