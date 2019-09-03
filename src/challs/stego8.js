const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `I got [this weird audio] from a dude who calls himself 'the friendly local alien'. I don't know about you, but something in this feels missing...`

var chall = {
    challid: 'stego7',
    title: 'An Alien Message',
    category: 'Steganography',
    points: 25,
    authorid: '275149655166287872',
    authorName: 'Annie',
    flag: '4650f7a08139560c076de87deff2daca1ad4047cd148da056f6997aa21b6dd62',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ["Check out the steganography workshop ;)"]
}

module.exports = chall
