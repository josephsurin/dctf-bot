const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = What's up with this vinegar riot? Someone from "Vinegar is gross" sent me this message. What in the world does it say? \`jttyarqnejqvsjohxmopnrtiettukpiycr\`
var chall = {
    challid: 'crypto13',
    title: 'Vigilance',
    category: 'Cryptography',
    points: 10,
    authorid: '275149655166287872',
    authorName: 'Annie',
    flag: '95223e160aeb6d9d7b49376140dc91dfb28fb70eb50ac6c0921b21f8b87354a2',
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
