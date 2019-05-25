const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
    challid: 'web2',
    title: 'Client Power',
    category: 'Web',
    points: 10,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '8e50203c098e159abe0ad102b40276c2001c7a739d9e212d3ab0d91b9aa71078',
    desc: async function(msg) {
        var description = `

            This service gives out free flags!
            ...if you're the admin.

            https://miscctf-web.herokuapp.com/web2/
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