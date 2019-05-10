const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { Chall } = require('../../models/index')

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/dctf-bot'
mongoose.connect(dbURI, { useNewUrlParser: true })
	.then(() => {
		console.log(`Connected to DB at ${dbURI} for maintenance`)
		
		files = fs.readdirSync(path.join(__dirname, '../challs'))

		var tasks = files.map(file => {
			return new Promise(async (resolve, reject) => {
				let challData = require(path.join(__dirname, '../challs', file))
				var challDoc = await Chall.findOne({ challid: challData.challid })
				if(!challDoc) {
					console.log('creating new document from challenge:', challData.challid)
					await Chall.create(Object.assign({ solves: [] }, challData))
					return resolve(1)
				}
				return resolve(0)
			})
		})

		Promise.all(tasks).then(changed => {
			var count = changed.filter(x => x).length
			console.log('added', count, 'new challenge documents to the database')
			mongoose.disconnect()
		})
	})

	