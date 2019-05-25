const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
    challid: 'stego3',
    title: 'Look! Chuck Norris!',
    category: 'Steganography',
    points: 20,
    authorid: '275149655166287872',
    authorName: 'Annie',
    flag: '3ae7e3517895d8119ef9266bac550fa78533b0702d316e2fe21adef690a3286a',
    desc: async function(msg) {
        var description = `
        [It's 2019, and he's back to wreck you with Chuck Norris Facts.](https://drive.google.com/open?id=1cg2E2UZ6oFalz04lpha9GsoooelSmIlm)
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
    notes: []
}

module.exports = chall