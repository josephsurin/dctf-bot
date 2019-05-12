const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'rev1',
	title: 'Basics',
	category: 'Reversing',
	points: 5,
	author: 'joseph#8210 (Joseph)',
	flag: 'e97fc87521b09c86f1819f4e28daff8ed0b05f9ea1b40375ab3b83ca40e69c38',
	desc: async function(msg) {
		var description = `
		[Know your basics!](https://drive.google.com/open?id=1a6i7-3J-gM-IjoN-W8foWgewKUIGfCtv)

		Note: Flag is MISCCTF{secret code}
		`

		let { challid, title, category, points, author } = chall
		var d = await Chall.findOne({ challid })
		var solveCount = d.solves.length
		var icon_url = 'https://cdn.discordapp.com/avatars/111028987836313600/9a177eb8ca0e33965d894ccc840d3f4b.jpg?size=32'

		var descEmbed = genChallEmbed({
			challid, title, category, points, author, solveCount, themecolour, description, icon_url
		})

		msg.channel.send({ embed: descEmbed })
	},
	notes: ['http://beta.rada.re/en/latest/']
}

module.exports = chall
