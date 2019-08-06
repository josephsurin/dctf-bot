const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
I used a one time pad twice to encrypt my two messages... I'm sure it'll be fine!

[part1_enc.png](https://drive.google.com/open?id=1GZg66LXX-njHLk0H2Hz-NUAIJf1JebXi)
[part2_enc.png](https://drive.google.com/open?id=1dkN15mHI4M4J7tNV-Z9WYQmr4HU6b4Ne)
`

var chall = {
    challid: 'crypto17',
    title: 'Two Time Pad',
    category: 'Cryptography',
    points: 35,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: 'be3c30002ec299ab958b35bf574a3e12bd8602740e3815c9e242074744727760',
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
