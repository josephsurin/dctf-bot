const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Download the file [slower.py](https://drive.google.com/file/d/1MnC27ZIFpXUGrMOcg_EHw2wSHXatj8eG/view).

Simply run it to print the flag. No password required!
`

var chall = {
    challid: 'rev4',
    title: 'Slower',
    category: 'Reversing',
    points: 50,
    authorid: '211676567284350977',
    authorName: 'Adam',
    flag: '4d6ae51ceef89ddd0fb3fdbc7767651e3d8254f368ec742066f7adf072f3e95a',
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
