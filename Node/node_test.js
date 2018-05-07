var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(client){
	console.log('connected to localhost')
	client.emit('hello', { hello: 'world' })

	client.on('event', function(data){});
	client.on('disconnect', function(){});
});
try{
	io.origins('localhost:8080')
	io.listen(3000)
} catch (err) {
	console.log(err)
}