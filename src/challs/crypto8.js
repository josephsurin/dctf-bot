const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
	challid: 'crypto8',
	title: 'Linear Cipher',
	category: 'Cryptography',
	points: 30,
	author: 'joseph#8210 (Joseph)',
	flag: '352e70933cf868fe2c4f32bc5a6c1fc3397e92243c6178cb7d78e159061c4ead',
	desc: async function(msg) {
		var description = `
			Here's a fun little cipher warmup exercise. Decipher the ciphertext and get your flag!

			The code is [here](https://drive.google.com/open?id=1VbgaSNDyiHrOh6cx1aJOhph9XQW5J1Dm)

			\`\`\`python
encrypted_flag  = '0x1944cccfb862a01424b14103b06e3ae90f586cb4ca128ba4f0b50c9a6b673e1bd745af2ec53e25e181536c1'\`\`\`
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
