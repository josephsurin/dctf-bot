const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
how [uncreative](https://drive.google.com/open?id=1ZnXp25G445kK4sMMPS3jFXpY1KKwA7Aa) of me`

var chall = {
    challid: 'stego10',
    title: 'Don\'t Hug me I\'m Squared',
    category: 'Steganography',
    points: 16,
    authorid: '379769327106260992',
    authorName: 'Chuanshu',
    flag: '20110da50497a8fc24131622b25bf54d75f198f259bcaec657af28f17ce93504',
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
