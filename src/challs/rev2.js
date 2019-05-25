const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()
const { Chall } = require(path.join(__dirname, '../../models/index'))

var chall = {
    challid: 'rev2',
    title: 'Coffee Plantation',
    category: 'Reversing',
    points: 75,
    authorid: '211676567284350977',
    authorName: 'Adam',
    flag: '1030dacfcff6d386a488fc5938114b1c3355328c363eb4b24aa102f411c012f8',
    desc: async function(msg) {
        var description = `
        [Automation has made farmers' lives so much easier these days](https://drive.google.com/open?id=1xPKg28__F3D5nsZ8b4Cb3pMMOjyquE2i)

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
