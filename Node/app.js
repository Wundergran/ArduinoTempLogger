const sqlite = require('sqlite')
const SerialPort = require('serialport')
const WebSocket = require('ws')

const dbPromise = sqlite.open('./database.sqlite', { Promise })

const TABLE = 'tempdata'
const FLD_TIME = 'time'
const FLD_TEMP = 'temp'

var sPort = new SerialPort('COM5', {
  baudRate: 57600
}).on('data', function(data) {
  dataRead(data)
})

/* const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
}); */

async function dataRead (data) {
  if (verifyData(data)) {
    var json = {
      time: Date.now(),
      temp: data.toString()
    }
    saveData(json)
  } else {
    console.log('Threw away garbage: ' + data.toString()) // Data read corrupted, throw away
  }
}

function verifyData (data) {
  var value = data.toString()
  
  return value.length === 5
}

async function saveData (jsonData) {
  try {
		const db = await dbPromise
    await db.exec(`INSERT INTO ${TABLE} (${FLD_TIME}, ${FLD_TEMP}) VALUES (${jsonData.time}, ${jsonData.temp})`)
    console.log(`INSERT: ${jsonData.time} - ${jsonData.temp}`)
	} catch (err) {
		console.log(err)
	}
}
