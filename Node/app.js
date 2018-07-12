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
const READ_EVENT = 'temp-read'

var latestTemp = null // Default void
var temps = []

var trashReads = 0
var totalReads = 0

var sPort = new SerialPort('COM5', {
  baudRate: 57600
}).on('data', function(data) {
  dataRead(data)
  totalReads++
})

io.on('connection', function(client){
  console.log('connected to localhost')
  var tempEventListener = async () => {
    if (latestTemp) {
      client.emit('lasttemp', latestTemp)
    }
  }
  var eventListener = null 
  eventEmitter.on(READ_EVENT, tempEventListener)
  client.on('listen', async function (args) {
    eventListener = async () => {
      const data = await fetchTemps(args.since)
      client.emit('temps', data)
    }
    eventEmitter.on(DATA_EVENT, eventListener) // listen for database changes
    client.emit('temps', await fetchTemps(args.since)) // send already existing data first
    if (latestTemp) {
      client.emit('lasttemp', latestTemp)
    }
  })
	client.on('disconnect', function(){ 
    console.log('client disconnected, event listeners destroyed')
    eventEmitter.removeListener(DATA_EVENT, eventListener)
    eventEmitter.removeListener(READ_EVENT, tempEventListener)
  });
});

try {
	io.origins('localhost:* 192.168.*:* 10.0.*:*')
	io.listen(3000)
} catch (err) {
	console.log(err)
}

 saveDataTimer() // Store data once every 3 mins

async function dataRead (data) {
  if (verifyData(data)) {
    var json = {
      time: Date.now(),
      temp: data.toString()
    }
    temps.push(json)
    latestTemp = json
    eventEmitter.emit(READ_EVENT)
  } else {
    //console.log('Threw away garbage: ' + data.toString()) // Data read corrupted, throw away
    trashReads++
  }
}

function verifyData (data) {
  var value = data.toString()
  return value.length === 5
}

// Database functions
async function saveData (jsonData) {
  try {
    const query = `INSERT INTO ${TABLE} (${FLD_TIME}, ${FLD_TEMP}) VALUES (${jsonData.time}, ${jsonData.temp})`
    if (!database) {
      database = await dbPromise
    }
    await database.exec(query)
    eventEmitter.emit(DATA_EVENT)
    console.log('EXECUTED: ' + query)
    // Calculate trash rate
    // var trashRate = ((totalReads - trashReads)/totalReads) * 100 // Percentage trash
    // console.log(`Trash rate now at ${trashRate}%`)
    totalReads = 0
    trashReads = 0
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

async function saveDataTimer () {
  if (temps.length > 0) {
    var tempTotal = 0
    temps.forEach(element => {
      tempTotal += Number(element.temp)
    })
    var tempAvg = tempTotal / temps.length
    var currentTime = Date.now()
    saveData({ time: currentTime, temp: tempAvg })
    temps = []
  }

  setTimeout(saveDataTimer, 1800000) // Store data once every 30 mins
}