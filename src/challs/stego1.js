const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'stego1',
	title: 'Darkness',
	category: 'Steganography',
	points: 10,
	author: 'joseph#8210 (Joseph)',
	flag: 'e01c55e0401ab7eba9911f687b2935107ff1d524fa2da420fc96501fc402362c',
	desc: async function(msg) {
		var description = `

			What do you think of my [painting](https://drive.google.com/open?id=1MkfM3miAaUfSxFeKjoQwQR_Y3DOOcenv)?
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
	notes: ['Just because you can\'t see anything with your eyes doesn\'t mean there isn\'t something there!']
}

module.exports = chall