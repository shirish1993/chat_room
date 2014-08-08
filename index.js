var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nicks=[];
var clients=[];
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res) {
  res.sendfile(__dirname + '/style.css');
});

app.get('/images/bg_image.jpg', function(req, res) {
  res.sendfile(__dirname + '/images/bg_image.jpg');
});

app.get('/images/send.png', function(req, res) {
  res.sendfile(__dirname + '/images/send.png');
});

app.get('/images/upload.png', function(req, res) {
  res.sendfile(__dirname + '/images/upload.png');
});

app.get('/script.js', function(req, res) {
  res.sendfile(__dirname + '/script.js');
});

app.get('/jquery.js', function(req, res) {
  res.sendfile(__dirname + '/jquery.js');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg,nick){
	//console.log("text received");
    socket.broadcast.emit('chat message', msg,nick);
  });
	socket.on('user image',function(msg,nick){
		//console.log("image received");
		socket.broadcast.emit('user image', msg,nick);
	});
	socket.on('get nicks',function(flag){
		var temp=JSON.stringify(nicks);
		io.emit('get nicks', temp);
	});
	socket.on('new nick',function(nick){
		console.log(nick + " added");
		nicks.push(nick);
		clients.push(socket);
	});
	socket.on('disconnect',function(){
		var i=clients.indexOf(socket);
		
		if(i!=-1){
			//console.log("removed "+nicks[i]);
			delete clients[i];
			delete nicks[i];
		}
		
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
