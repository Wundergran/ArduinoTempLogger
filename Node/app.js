const SerialPort = require('serialport');
var sPort = new SerialPort('COM6', {
  baudRate: 9600
});

sPort.on('data', function(data) {
    console.log(data.toString('utf8'));
})
