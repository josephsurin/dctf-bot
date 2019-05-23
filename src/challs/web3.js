const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'web3',
	title: 'JavaScript is fun',
	category: 'Web',
	points: 20,
	author: 'joseph#8210 (Joseph)',
	flag: '2ea9b7effd5fbde272f623b78ae37715f28abd5927029207d69a30a428098f02',
	desc: async function(msg) {
		var description = `

            This service checks if you've got the flag right... all with the power of JavaScript!

            https://miscctf-web.herokuapp.com/web3/
		`

		let { challid, title, category, points, author } = chall
		var d = await Chall.findOne({ challid })
		var { solves, votes } = d
		var icon_url = 'https://cdn.discordapp.com/avatars/111028987836313600/9a177eb8ca0e33965d894ccc840d3f4b.jpg?size=32'

		var descEmbed = genChallEmbed({
			challid, title, category, points, author, solves, themecolour, description, icon_url, votes
		})

		msg.channel.send({ embed: descEmbed })
	},
	notes: []
}

module.exports = chall
