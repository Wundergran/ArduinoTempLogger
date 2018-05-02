const sqlite = require('sqlite')
const dbPromise = sqlite.open('./testdb.sqlite', { Promise })
const dbTable = 'tempdata'

const testData = {
	time: 12444453653123,
	temp: 23.45
}
tryDb()

async function tryDb () {
	console.log('async')
	try {
		const db = await dbPromise
		const temps = await db.get('SELECT * FROM ' + dbTable)
		console.log(temps)
	} catch (err) {
		console.log(err)
	}
}
