const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
:eyes:

https://miscctf-web.herokuapp.com/web1/`

var chall = {
    challid: 'web1',
    title: 'Basic Web Chall',
    category: 'Web',
    points: 5,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '6654dfbb757108371485a07e5448474d5f07b7dcbd68a170513e4c0f22de2403',
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