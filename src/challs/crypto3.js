const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'crypto3',
	title: 'RSA Level 1',
	category: 'Cryptography',
	points: 15,
	authorid: '111028987836313600',
    authorName: 'Joseph',
	flag: '50a2bbf84bc08fe39874dd534dc53ae62dc6596f7085958d6b3fc45bf9a98455',
	desc: async function(msg) {
		var description = `

            Is there anything noteworthy about \`n\`?

			\`\`\`n = 64102002301840754228195419684105688294791204377114921273193411967543960790809
e = 65537
c = 59275256886013998614804534443446044923122093593042100696977962063455729483055\`\`\`
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
	notes: ['https://en.wikipedia.org/wiki/Integer_factorization']
}

module.exports = chall