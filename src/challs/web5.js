const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Well, this seems easy.

https://miscctf-web.herokuapp.com/web5/`

var chall = {
    challid: 'web5',
    title: 'Babytrick',
    category: 'Web',
    points: 10,
    authorid: '211676567284350977',
    authorName: 'Adam',
    flag: '70abb913c22624f5af763dea2308379274cda4303ad1618111841b03237e7641',
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
