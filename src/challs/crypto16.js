const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
I found this base64 string accompanied by some pieces of paper... Can you make sense of this weird diagram?!

\`\`\`
a1x4ohs/GgOTdiFBBpAiT3Y3/kV8NljwBBAFB5M1Pw4Dj19gbTfhAEwBpfFGAl6Wh3VbaZWYdWwBpuEqawHv4T5Yc5a+XChI+/IFbBfIijJne9WKah4korleEGiPt0V1G/zeK3wr4vIGEkSWrXQSUb33NHc14sQGeGC8kVVPVInyYB0GjLtRLjC+xlA=
\`\`\`

[cipher.jpg](https://drive.google.com/open?id=13w2AHsAWx7cANOF3CBQJ_aFdiy_NHDkF)
[tear.jpg](https://drive.google.com/open?id=1-Kr__ok_e1F0BlStJ8xGdKxToB9rJop0)
`

var chall = {
    challid: 'crypto16',
    title: 'Sketch',
    category: 'Cryptography',
    points: 70,
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
