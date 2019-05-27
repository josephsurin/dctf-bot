const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
[It's 2019, and he's back to wreck you with Chuck Norris Facts.](https://drive.google.com/open?id=1cg2E2UZ6oFalz04lpha9GsoooelSmIlm)`

var chall = {
    challid: 'stego3',
    title: 'Look! Chuck Norris!',
    category: 'Steganography',
    points: 20,
    authorid: '275149655166287872',
    authorName: 'Annie',
    flag: '3ae7e3517895d8119ef9266bac550fa78533b0702d316e2fe21adef690a3286a',
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