const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
The best pasting site on the planet is making a name for itself with its totally not generic Bootstrap frontend and very secure and robust Node backend! Did I mention the very attentive and loyal support team they have...? 

https://miscctf-web.herokuapp.com/web4/`

var chall = {
    challid: 'web4',
    title: 'Yet Another Pasting Site',
    category: 'Web',
    points: 70,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: 'ce6946516abf53818adf6c0ad582a65005ca5bd8fd2b31a04388a5df9a215694',
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
