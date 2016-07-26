const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const db=require('./dbhandler')

const app=express();
const server=http.Server(app);
const io=socketio(server);

io.on("connection",function(socket){
  console.log('a user is connected');
  socket.on('chat',function(data){
   db.addchat(data,function(data){
   });
    io.emit('chat',data);
  })
});

app.get('/fetchchat',function(req,res){
  db.fetchmsg(function(data){
    res.send(data);
  })
});

app.use('/',express.static(__dirname+'/public'));

server.listen(3000);
