const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'crypto1',
	title: 'ROT13',
	category: 'Cryptography',
	points: 5,
	authorid: '111028987836313600',
    authorName: 'Joseph',
	flag: '569d0e82442ef1900ee8ee49fc9b818494172c34277c52389ee170f40625446c',
	desc: async function(msg) {
		var description = `

			Sanity check...

			\`\`\`ZVFPPGS{ebg13_vfa'g_irel_vagrerfgvat}\`\`\`
		`

		let { challid, title, category, points, authorid, authorName } = chall
		var d = await Chall.findOne({ challid })
		var { solves, votes } = d
		var authorUser = await global.djsclient.fetchUser(authorid)
        var { username, discriminator, displayAvatarURL: icon_url } = authorUser
        var author = `${username}#${discriminator} (${authorName})`

		var descEmbed = genChallEmbed({
			challid, title, category, points, author, solves, themecolour, description, icon_url, votes
		})

		msg.channel.send({ embed: descEmbed })
	},
	notes: ['https://en.wikipedia.org/wiki/ROT13']
}

module.exports = chall