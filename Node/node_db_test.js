import sqlite from 'sqlite';
const dbPromise = sqlite.open('./database.sqlite', { Promise })

const testData = {
	time: 12444453653123,
	temp: 23.45
}
