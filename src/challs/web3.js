const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
This service checks if you've got the flag right... all with the power of JavaScript!

https://miscctf-web.herokuapp.com/web3/`

var chall = {
    challid: 'web3',
    title: 'JavaScript is fun',
    category: 'Web',
    points: 20,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '2ea9b7effd5fbde272f623b78ae37715f28abd5927029207d69a30a428098f02',
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
