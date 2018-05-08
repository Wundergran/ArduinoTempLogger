const sqlite = require('sqlite')
const SerialPort = require('serialport')
const Events = require('events')
var server = require('http').createServer();
var io = require('socket.io')(server);

const dbPromise = sqlite.open('./database.sqlite', { Promise })
const eventEmitter = new Events.EventEmitter()

const TABLE = 'tempdata'
const FLD_TIME = 'time'
const FLD_TEMP = 'temp'

const DATA_EVENT = 'new-data'

var wsClient = null
var latestTemp = null // Default void

var sPort = new SerialPort('COM5', {
  baudRate: 57600
}).on('data', function(data) {
  dataRead(data)
})

io.on('connection', function(client){
	console.log('connected to localhost')
  // wsClient = client
  // client.emit('last-temp', latestTemp)
  client.on('listen', function (args) {
    eventEmitter.on(DATA_EVENT, function () { // listen for database changes
      
    })
  })
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

function emitReading(data) {
  if (wsClient && wsClient !== null && data) {
    try {
      wsClient.emit('lasttemp', data)
    } catch (err) {
      console.log(err)
    }
  }
}

async function dataRead (data) {
  if (verifyData(data)) {
    var json = {
      time: Date.now(),
      temp: data.toString()
    }
    saveData(json)
    emitReading(json)
  } else {
    console.log('Threw away garbage: ' + data.toString()) // Data read corrupted, throw away
  }
}

function verifyData (data) {
  var value = data.toString()
  return value.length === 5
}

async function saveData (jsonData) {
  latestTemp = jsonData
  try {
    const query = `INSERT INTO ${TABLE} (${FLD_TIME}, ${FLD_TEMP}) VALUES (${jsonData.time}, ${jsonData.temp})`
		const db = await dbPromise
    await db.exec(query)
    eventEmitter.emit(DATA_EVENT)
    console.log('EXECUTED: ' + query)
	} catch (err) {
		console.log(err)
	}
}
