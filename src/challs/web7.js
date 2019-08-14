const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { cmdprefix, themecolour } = getBotConfig()

const description = `
A website that gives you a nice cat image everytime you log in! Just what you wanted right?

http://miscctf-web.herokuapp.com/web7`

var chall = {
    challid: 'web7',
    title: 'Cat Images',
    category: 'Web',
    points: 40,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '22418bc027600cb449f21338c681586c58bf7acd7e996ae46071b04a47a5041a',
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
