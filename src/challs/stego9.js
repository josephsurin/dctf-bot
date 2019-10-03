const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
I only like [squares](https://drive.google.com/open?id=1t32f76zyi_Ji1M96IlJO9a7PytCRVTwS)`

var chall = {
    challid: 'stego9',
    title: 'Square up',
    category: 'Steganography',
    points: 36,
    authorid: '379769327106260992',
    authorName: 'Chuanshu',
    flag: '9f163d6095764befaac9ac5d9434a95fc420052a9677fd9733693ca305c1fe13',
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
