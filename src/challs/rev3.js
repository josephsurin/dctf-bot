const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Download the file [babyasm.zip](https://drive.google.com/file/d/1vWl_wCWbUfxf9YDvp5eiAv917qlwEZa9/view).

You recently wrote an awesome C program, but you lost the names of each of the functions! Luckily you have an asm dump lying around of your program.
Identify the names of the censored functions using the asm dump provided.
The solution is the names of the functions in \`challenge.c\` in order, joined with underscores and surrounded by \`MISCCTF{}\`.

For example, if you thought the functions in order were \`apple\`, \`banana\`, \`cherry\`, \`orange\` and \`pear\`, your flag would be \`MISCCTF{apple_banana_cherry_orange_pear}\`.
`

var chall = {
    challid: 'rev3',
    title: 'BabyASM',
    category: 'Reversing',
    points: 10,
    authorid: '211676567284350977',
    authorName: 'Adam',
    flag: '73aad9b418701a14d7e084b79c2bdedb11a6f10860b844e615abb9c4a5449481',
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
