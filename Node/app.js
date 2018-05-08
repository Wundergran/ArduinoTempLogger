const sqlite = require('sqlite')
const SerialPort = require('serialport')
const Events = require('events')
var server = require('http').createServer();
var io = require('socket.io')(server);

const dbPromise = sqlite.open('./database.sqlite', { Promise })
var database = null
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
  client.on('listen', async function (args) {
    eventEmitter.on(DATA_EVENT, async function (args) { // listen for database changes
      const data = await fetchTemps(args.since)
      client.emit('temps', data)
      client.emit('lasttemp', latestTemp)
    })
    client.emit('temps', await fetchTemps('1525755600000'))
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

async function dataRead (data) {
  if (verifyData(data)) {
    var json = {
      time: Date.now(),
      temp: data.toString()
    }
    saveData(json)
    latestTemp = json
  } else {
    console.log('Threw away garbage: ' + data.toString()) // Data read corrupted, throw away
  }
}

function verifyData (data) {
  var value = data.toString()
  return value.length === 5
}

// Database functions
async function saveData (jsonData) {
  latestTemp = jsonData
  try {
    const query = `INSERT INTO ${TABLE} (${FLD_TIME}, ${FLD_TEMP}) VALUES (${jsonData.time}, ${jsonData.temp})`
    if (!database) {
      database = await dbPromise
    }
    await database.exec(query)
    eventEmitter.emit(DATA_EVENT)
    console.log('EXECUTED: ' + query)
	} catch (err) {
		console.log(err)
	}
}

async function fetchTemps (time) {
  try {
    if (!database) {
      database = await dbPromise
    }
    return temps = await database.all(`SELECT * FROM ${TABLE} WHERE ${FLD_TIME} > ${time}`)
  } catch (err) {
    console.log(err)
  }
}