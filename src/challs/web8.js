const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { cmdprefix, themecolour } = getBotConfig()

const description = `
A service to privately share products you have for sale, currently in beta. It's rumoured that the admins have a secret item for sale...

http://miscctf-web.herokuapp.com/web8`

var chall = {
    challid: 'web8',
    title: 'Private Bids',
    category: 'Web',
    points: 65,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '7b3076a96947690baca7a5ec9c690d5c8221214863e8a2854f1f38d0510ca465',
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
