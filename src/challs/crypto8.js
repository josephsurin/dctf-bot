const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Here's a fun little cipher warmup exercise. Decipher the ciphertext and get your flag!

The code is [here](https://drive.google.com/open?id=1VbgaSNDyiHrOh6cx1aJOhph9XQW5J1Dm)

\`\`\`python
encrypted_flag  = '0x1944cccfb862a01424b14103b06e3ae90f586cb4ca128ba4f0b50c9a6b673e1bd745af2ec53e25e181536c1'\`\`\``

var chall = {
    challid: 'crypto8',
    title: 'Linear Cipher',
    category: 'Cryptography',
    points: 45,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '352e70933cf868fe2c4f32bc5a6c1fc3397e92243c6178cb7d78e159061c4ead',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: []
}

module.exports = chall
