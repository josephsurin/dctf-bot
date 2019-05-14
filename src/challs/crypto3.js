const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'crypto3',
	title: 'RSA Level 1',
	category: 'Cryptography',
	points: 15,
	author: 'joseph#8210 (Joseph)',
	flag: '50a2bbf84bc08fe39874dd534dc53ae62dc6596f7085958d6b3fc45bf9a98455',
	desc: async function(msg) {
		var description = `

            Is there anything noteworthy about \`n\`?

			\`\`\`n = 64102002301840754228195419684105688294791204377114921273193411967543960790809
e = 65537
c = 59275256886013998614804534443446044923122093593042100696977962063455729483055\`\`\`
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
	notes: ['https://en.wikipedia.org/wiki/Integer_factorization']
}

module.exports = chall