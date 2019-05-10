const fs = require('fs')
const path = require('path')

function getBotConfig() {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '../../botconfig.json')))
}

module.exports = {
	getBotConfig
}