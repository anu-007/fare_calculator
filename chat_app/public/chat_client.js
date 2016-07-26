const socket=io();
var largest=1;
$(function(){
showchat();
  const username=prompt('enter username');
  $('#submitchat').click(function(){
    socket.emit('chat',{id:largest+1,user:username,msg:$('#chatmessage').val(),time:$.now()})
  });
  socket.on('chat',function(data){
    $('#chatbox').append(data.user+':'+data.msg+'   '+data.time+'<br>');
    largest=data.id;
  })
});

function showchat(){
  $.get('/fetchchat',function(data,status){
    for(let i=0;i<data.length;i++){
    $('#chatbox').append(data[i].user+':    '+data[i].msg+'     '+data[i].time+'<br>');
    largest=data[i].id;
  }
  })
}
