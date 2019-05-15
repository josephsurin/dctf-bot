const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'web1',
	title: 'Basic Web Chall',
	category: 'Web',
	points: 5,
	author: 'joseph#8210 (Joseph)',
	flag: '6654dfbb757108371485a07e5448474d5f07b7dcbd68a170513e4c0f22de2403',
	desc: async function(msg) {
		var description = `

			:eyes:

            https://miscctf-web.herokuapp.com/web1/
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
	notes: []
}

module.exports = chall