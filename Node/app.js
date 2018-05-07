const sqlite = require('sqlite')
const SerialPort = require('serialport')
var server = require('http').createServer();
var io = require('socket.io')(server);

const dbPromise = sqlite.open('./database.sqlite', { Promise })

const TABLE = 'tempdata'
const FLD_TIME = 'time'
const FLD_TEMP = 'temp'

var wsClient = null

var sPort = new SerialPort('COM5', {
  baudRate: 57600
}).on('data', function(data) {
  dataRead(data)
})

io.on('connection', function(client){
	console.log('connected to localhost')
  wsClient = client

	client.on('event', function(data){});
	client.on('disconnect', function(){ 
    wsClient = null
    console.log('client disconnected') 
  });
});

try{
	io.origins('localhost:8080')
	io.listen(3000)
} catch (err) {
	console.log(err)
}

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
