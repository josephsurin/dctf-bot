// this file exports an object containing all the challenges
const fs = require('fs')
const path = require('path')

var challs = function loadChalls() {
	var files = fs.readdirSync(__dirname).filter(x => x != 'index.js')
	var challsObj = {}
	files.forEach(file => {
		var challData = require(path.join(__dirname, file))
		challsObj[challData.challid] = challData
		if(challData['init']) {
			challData['init']()
		}
	})
	return challsObj
}()

module.exports = challs
