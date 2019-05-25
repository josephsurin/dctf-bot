const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
    challid: 'stego1',
    title: 'Darkness',
    category: 'Steganography',
    points: 10,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: 'e01c55e0401ab7eba9911f687b2935107ff1d524fa2da420fc96501fc402362c',
    desc: async function(msg) {
        var description = `

            What do you think of my [painting](https://drive.google.com/open?id=1MkfM3miAaUfSxFeKjoQwQR_Y3DOOcenv)?
        `

        let { challid, title, category, points, authorid, authorName } = chall
        var d = await Chall.findOne({ challid })
        var { solves, votes } = d
        var authorUser = await global.djsclient.fetchUser(authorid)
        var { username, discriminator, displayAvatarURL: icon_url } = authorUser
        var author = `${username}#${discriminator} (${authorName})`

        var descEmbed = genChallEmbed({
            challid, title, category, points, author, solves, themecolour, description, icon_url, votes
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['Just because you can\'t see anything with your eyes doesn\'t mean there isn\'t something there!']
}

module.exports = chall