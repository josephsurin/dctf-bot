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
    flag: '87877da78bf52b804ba45014717ac14ff6ca2b70121e6ed918b66e01a1921327',
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
