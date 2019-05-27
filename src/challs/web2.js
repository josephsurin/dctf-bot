const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
This service gives out free flags!
...if you're the admin.

https://miscctf-web.herokuapp.com/web2/`

var chall = {
    challid: 'web2',
    title: 'Client Power',
    category: 'Web',
    points: 10,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '8e50203c098e159abe0ad102b40276c2001c7a739d9e212d3ab0d91b9aa71078',
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