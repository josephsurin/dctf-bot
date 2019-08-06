const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
A handy flag checker!
Download Here: [ghost](https://drive.google.com/open?id=1fUh67Td1rnU4Zb3bsRTikgeVnUhQgmnH).
`

var chall = {
    challid: 'rev6',
    title: 'Ghost',
    category: 'Reversing',
    points: 30,
    authorid: '219792140472025089',
    authorName: 'John',
    flag: 'd663adb618da8d290081baba21a4aafafada2e5060ca7504bba7ffd9a51243b2',
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