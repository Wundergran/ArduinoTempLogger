const sqlite = require('sqlite')
const dbPromise = sqlite.open('./database_repl.sqlite', { Promise })
const dbTable = 'tempdata'
tryDb()

async function tryDb () {
	try {
		const db = await dbPromise
		const temps = await db.all(`SELECT * FROM ${dbTable} WHERE time > 1525755600000`)
		console.log(temps)
	} catch (err) {
		console.log(err)
	}
}
