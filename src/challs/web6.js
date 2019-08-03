const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { cmdprefix, themecolour } = getBotConfig()

const description = `
:hushed: :drooling_face: :sunglasses: :see_no_evil: :computer: :keyboard: :syringe: :smirk_cat: :japanese_goblin:

https://emoji-combiner-ctf.herokuapp.com/`

var chall = {
    challid: 'web6',
    title: 'Emoji Combiner',
    category: 'Web',
    points: 50,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: 'a70377a70c470a6bec29e940eeec7ff53537c42b43b4fbfe47e64d6a339e31b4',
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
