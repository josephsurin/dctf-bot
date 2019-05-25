const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
    challid: 'web1',
    title: 'Basic Web Chall',
    category: 'Web',
    points: 5,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '6654dfbb757108371485a07e5448474d5f07b7dcbd68a170513e4c0f22de2403',
    desc: async function(msg) {
        var description = `

            :eyes:

            https://miscctf-web.herokuapp.com/web1/
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