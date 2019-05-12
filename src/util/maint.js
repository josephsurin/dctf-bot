const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { Chall } = require('../../models/index')

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/dctf-bot'
mongoose.connect(dbURI, { useNewUrlParser: true })
	.then(() => {
		console.log(`Connected to DB at ${dbURI} for maintenance`)
		
		var files = fs.readdirSync(path.join(__dirname, '../challs')).filter(x => x != 'index.js')

		var tasks = files.map(file => {
			return new Promise(async (resolve, reject) => {
				var { challid, title, points, author } = require(path.join(__dirname, '../challs', file))
				var challData = { challid, title, points, author }
				var challDoc = await Chall.findOne({ challid: challid })
				if(!challDoc) {
					console.log('creating new document for challenge:', challid)
					await Chall.create(Object.assign({ solves: [] }, challData))
					return resolve(1)
				} else {
					if(challDoc.title != title || challDoc.points != points || challDoc.author != author) {
						console.log('updating document for challenge:', challid)
						await Chall.updateOne({ challid }, challData)
						return resolve(2)
					}
				}
				return resolve(0)
			})
		})

		Promise.all(tasks).then(changed => {
			var countAdded = changed.filter(x => x == 1).length
			var countModified = changed.filter(x => x == 2).length
			console.log('added', countAdded, 'new challenge documents to the database')
			console.log('modified', countModified, 'challenge documents in the database')
			mongoose.disconnect()
		})
	})

	