const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'crypto9',
	title: 'RSA Level 5',
	category: 'Cryptography',
	points: 35,
	authorid: '111028987836313600',
    authorName: 'Joseph',
	flag: 'b6b6d3b6a08b82340a87f10e45ad1bedd0189bec9cd61f73c310278c42d8a01a',
	desc: async function(msg) {
		var description = `

			Two values of \`e\` but only one \`n\` :thinking:

			The values are [here](https://paste.ee/r/7Qhh3/0)

			\`\`\`python
from Crypto.Util.number import getPrime, bytes_to_long

flag = b'MISCCTF{this is not the flag by the way}'

n = getPrime(1024) * getPrime(1024)

e1 = 17489
e2 = 65537

m = bytes_to_long(flag)

c1 = pow(m, e1, n)
c2 = pow(m, e2, n)\`\`\`
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
	notes: []
}

module.exports = chall
