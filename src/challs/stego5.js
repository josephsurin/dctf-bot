const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `Unicode is so cool right!? [Here's](https://drive.google.com/open?id=1ALCsXmZV-AmCRKVEXhFz7s2Lt7pUn4WU) the introduction for the specification!`

var chall = {
    challid: 'stego5',
    title: 'ᑌ ᑎ I ᑕ O ᗪ E',
    category: 'Steganography',
    points: 45,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '8912b4a0323ebb4eb4859048ca12bd6d1bfa0ea3e02398839671cd8433fc73a5',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['https://en.wikipedia.org/wiki/Steganography#Digital_text', 'One dimensional binary?']
}

module.exports = chall
