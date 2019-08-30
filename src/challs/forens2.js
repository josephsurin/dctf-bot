const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `We think our agent in the field is trying to tell us something, 
                        but she just keeps sending us pictures from her favourite cartoon. Can you make
                        sense of this [message](https://drive.google.com/open?id=1uF4_b7An6wZ76kAOl2ue1hW7PctVRCfL)?`

var chall = {
    challid: 'forens2',
    title: 'Secret Message',
    category: 'Forensics',
    points: 90,
    authorid: '219792140472025089',
    authorName: 'John',
    flag: 'fc6fdb9de0da4807e8b8f31436df0f43a515e37ca79dacfdaf7b4de10e026c4a',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ["The image is incidental, make sure you consider all other channels."]
}

module.exports = chall