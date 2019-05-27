const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
[Automation has made farmers' lives so much easier these days](https://drive.google.com/open?id=1xPKg28__F3D5nsZ8b4Cb3pMMOjyquE2i)`

var chall = {
    challid: 'rev2',
    title: 'Coffee Plantation',
    category: 'Reversing',
    points: 75,
    authorid: '211676567284350977',
    authorName: 'Adam',
    flag: '1030dacfcff6d386a488fc5938114b1c3355328c363eb4b24aa102f411c012f8',
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
