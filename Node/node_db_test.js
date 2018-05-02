const sqlite = require('sqlite')
const dbPromise = sqlite.open('./testdb.sqlite', { Promise })
const dbTable = 'tempdata'
tryDb()

async function tryDb () {
	try {
		const db = await dbPromise
		const temps = await db.all('SELECT * FROM ' + dbTable)
		console.log(temps)
	} catch (err) {
		console.log(err)
	}
}
