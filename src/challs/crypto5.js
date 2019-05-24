const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'crypto5',
	title: 'RSA Level 3',
	category: 'Cryptography',
	points: 25,
	authorid: '111028987836313600',
    authorName: 'Joseph',
	flag: '26dee7fe6bc26c84359be844be7697c0908ea4ac2fce4e3e6d9c3ae99978b4ab',
	desc: async function(msg) {
		var description = `

            I'm trying to send a secret message to three of my friends... Am I doing it right?

			The values are [here](https://paste.ee/r/SQGxm/0).

            \`\`\`python
from Crypto.Util.number import getPrime, bytes_to_long
from math import gcd

n1, n2, n3 = getPrime(1024), getPrime(1024), getPrime(1024)
assert(gcd(n1, n2) == gcd(n1, n3) == gcd(n2, n3) == 1)
e = 3

flag = b'MISCCTF{this is not the flag by the way}'
m = bytes_to_long(flag)

c1, c2, c3 = pow(m, e, n1), pow(m, e, n2), pow(m, e, n3)\`\`\`
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
	notes: ['https://en.wikipedia.org/wiki/Chinese_remainder_theorem']
}

module.exports = chall