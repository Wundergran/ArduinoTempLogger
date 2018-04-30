const http = require('http');
const SerialPort = require('serialport');
var sPort = new SerialPort('COM6', {
  baudRate: 9600
});

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

sPort.on('data', function(data) {
    console.log(data.toString('utf8'));
})
