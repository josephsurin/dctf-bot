const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

var chall = {
    challid: 'stego2',
    title: 'Dog',
    category: 'Steganography',
    points: 40,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '2d404449ec687f43b4aee755ddc01a30a665972662bb6dd355e0277cbff004cd',
    desc: async function(msg) {
        var description = `

            I think [this dog](https://drive.google.com/open?id=1MMo64yB4yAUBEKGkAnzfMp4PTm8EE04q) is trying to tell me something of little significance, but I can't understand him one bit! Can you help me?
        `

        let { challid, title, category, points, authorid, authorName } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['https://en.wikipedia.org/wiki/Bitmap', 'https://python-pillow.org/', 'https://en.wikipedia.org/wiki/Bit_numbering#Least_significant_bit']
}

module.exports = chall