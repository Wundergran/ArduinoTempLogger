const sqlite = require('sqlite')
const dbPromise = sqlite.open('./testdb.sqlite', { Promise })

const SerialPort = require('serialport')

var sPort = new SerialPort('COM6', {
  baudRate: 57600
}).on('data', function(data) {
  dataRead(data)
})

var tempLog = []

function dataRead (data) {
  if (verifyData(data)) {
    var json = {
      time: Date.now(),
      temp: data.toString()
    }
    console.log(json)
    saveData(json)
  } else {
    console.log('Threw away garbage: ' + data.toString()) // Data read corrupted, throw away
  }
}

function verifyData (data) {
  var value = data.toString()
  
  return value.length === 5
}

function saveData (jsonData) {
  
}
