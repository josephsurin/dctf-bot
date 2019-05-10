const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'crypto2',
	title: 'ROT13',
	category: 'Cryptography',
	points: 5,
	author: 'joseph#8210 (Joseph)',
	flag: '569d0e82442ef1900ee8ee49fc9b818494172c34277c52389ee170f40625446c',
	desc: async function(msg) {
		var description = `

			Sanity check...

			\`\`\`ZVFPPGS{ebg13_vfa'g_irel_vagrerfgvat}\`\`\`
		`

		let { challid, title, category, points, author } = chall
		var d = await Chall.findOne({ challid })
		var solveCount = d.solves.length
		var icon_url = 'https://cdn.discordapp.com/avatars/111028987836313600/9a177eb8ca0e33965d894ccc840d3f4b.jpg?size=32'

		var descEmbed = genChallEmbed({
			challid, title, category, points, author, solveCount, themecolour, description, icon_url
		})

		msg.channel.send({ embed: descEmbed })
	}
}

module.exports = chall