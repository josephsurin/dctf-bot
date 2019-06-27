const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `[Something happened to my wav file](https://drive.google.com/open?id=1-PJYVQhIIKixV6WWDUTVIGm79v-mbT2N) and now there are screeches all over the place :slight_frown:

It seems so mechanical and exact though... maybe it's the universe trying to tell me something :thinking:`

var chall = {
    challid: 'stego4',
    title: 'Kimi no Na wa.',
    category: 'Steganography',
    points: 95,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: 'b7b5beb4f0e423567b0dd1347b0d1889e162654ac6faddc4e75e669dbf7711ed',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['Use headphones!', 'https://www.sonicvisualiser.org/']
}

module.exports = chall
