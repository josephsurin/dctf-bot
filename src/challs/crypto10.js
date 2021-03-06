const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
Is there anything that seems out of the ordinary? :eyes:

The values are [here](https://paste.ee/r/2eGJI/0)

            \`\`\`python
from Crypto.Util.number import getPrime, bytes_to_long

flag = b'MISCCTF{this is not the flag by the way}'

e = 0x10001
p1 = getPrime(1024)
p2 = p1
q1 = getPrime(1024)
q2 = getPrime(1024)
n1 = p1 * q1
n2 = p2 * q2

m = bytes_to_long(flag)

c1 = pow(m, e, n1)
c2 = pow(m, e, n2)\`\`\``

var chall = {
    challid: 'crypto10',
    title: 'RSA Level 6',
    category: 'Cryptography',
    points: 20,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: '794d71de1d47901e6d7f886947363f814e8893eb2be978454d15de1d3f5eb33f',
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
