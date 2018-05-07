var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){
	console.log('connecting....')
	//client.on('event', function(data){});
	//client.on('disconnect', function(){});
});
try{
	io.origins('*:*')
	io.listen(3000)
} catch (err) {
	console.log(err)
}