const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `Hey, I didn't see the stego workshop, but I've heard it's straight forward [to solve this](https://drive.google.com/file/d/19z9LcGzWucqdaguRQcXMVKFRb70LrMa0/view?usp=sharing) if you did see it. I've just been enjoying the music, but something about the songs seem missing...`

var chall = {
    challid: 'stego8',
    title: 'Audio Stego Adventure!!!',
    category: 'Steganography',
    points: 25,
    authorid: '275149655166287872',
    authorName: 'Annie',
    flag: '4650f7a08139560c076de87deff2daca1ad4047cd148da056f6997aa21b6dd62',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['Songs used in this chall:',
            'Sparta - Sabaton',
            'Don\'t stop me now - Queen',
            'Fields of Verdun - Sabaton',
            'Favorite Son - Green Day (Broadway version)',
            '82nd all the way - Sabaton',
            'Highway to Hell - AC/DC',
            'Check out the steganography workshop ;) (slides/pdf on github)']
}

module.exports = chall
