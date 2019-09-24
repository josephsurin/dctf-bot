const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Reading and scripting are two very important abilities in both infosec and in life in general.
This challenge puts those abilities to the test!

You are given 2401 APNG (Animated PNG) files. Each holds a "pixel" of a QR code that, when combined, makes up the flag.
Each pixel has been "hidden" as one of the frames in the APNG. The frame which corresponds to the pixel is given by the number of times the APNG loops (you do not need to look at the APNG to count how many times it loops; read the specifications!)

Your task is to extract the "pixel frame" from each APNG and combine them to reconstruct the flag QR code.

Python will be your best friend, and the APNG and PNG specifications will be indispensable. See the challenge notes for links.

Good luck!

File: [apngs.zip](https://drive.google.com/open?id=196D0DorFZkkd0IkZ7FALTjfXkkkNfn63)
`

var chall = {
    challid: 'misc1',
    title: 'what is hAPpeNinG?',
    category: 'Miscellaneous',
    points: 90,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '60d6162e6f0cfd286167258a061790154c8c4edf8a15222dd31b6f08472caf57',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['https://wiki.mozilla.org/APNG_Specification', 'https://en.wikipedia.org/wiki/APNG#Technical_details', 'http://www.w3.org/TR/PNG/', 'https://imagemagick.org/index.php']
}

module.exports = chall
