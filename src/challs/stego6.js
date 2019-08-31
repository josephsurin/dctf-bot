const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `Not too long ago, a guy, let's call him SMA, introduced me to the world of pixels puzzles. I now suffer from "pixel traumatic stress disorder". There'll be a series of puzzles summarising the kinds of puzzles I encountered, but it all began with a puzzle like [this](https://drive.google.com/file/d/10ok0gFyGnMmcvYuwPjEttfnGORtj475X/view?usp=sharing).`

var chall = {
    challid: 'stego6',
    title: 'PTSD 1: The Beginning',
    category: 'Steganography',
    points: 10,
    authorid: '275149655166287872',
    authorName: 'Annie',
    flag: 'b4112d44dd623173c09698d011088576cfc98bc0bc39626ce0ef55aec522a009',
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
