const path = require('path')
const { getBotConfig, genChallEmbed } = require(path.join(__dirname, '../util/util'))
const { themecolour } = getBotConfig()

const description = `
What's an elliptic curve!?

\`\`\`python
from Crypto.Util.number import bytes_to_long as btl
from Crypto.Random.random import randint

p = 16467119735301371251
F = GF(p)
a = F(15992)
b = F(1935)
E = EllipticCurve(F, [a, b])
G = E.gens()[0] # generator point
k = randint(int(1), int(p-1)) # private
Q = k*G # public

flag_content = b'REDACTED'
fullflag = b'MISCCTF{' + flag_content + '}'
x = F(btl(flag_content))
rhs = x^3 + a*x + b
K = (p-1)//2
y = pow(rhs, (K+1)//2, p)
assert y^2 == rhs
flag_point = E((x, y)) # flag is the x component

r = randint(int(1), int(p-1))
rG = r*G
S = r*Q
e = flag_point + S

print 'p={}\\na={}\\nb={}\\nQ={}\\nrG={}\\ne={}'.format(p,a,b,Q,rG,e)
# print '\\nk={}\nx={}\\nr={}'.format(k,x,r) you wish...
\`\`\`
`

var chall = {
    challid: 'crypto19',
    title: 'Baby ECC',
    category: 'Cryptography',
    points: 35,
    authorid: '111028987836313600',
    authorName: 'Joseph',
    flag: 'bd7a679148ae03fdeea1253cccb5feb51767f97a35d88901e72292da868638fc',
    description,
    desc: async function(msg) {

        let { challid, title, category, points, authorid, authorName, description } = chall

        var descEmbed = await genChallEmbed({
            challid, title, category, points, authorid, authorName, themecolour, description
        })

        msg.channel.send({ embed: descEmbed })
    },
    notes: ['https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/', 'https://github.com/ashutosh1206/Crypton/tree/master/Elliptic-Curves', 'https://github.com/ashutosh1206/Crypton/tree/master/Elliptic-Curves', 'http://doc.sagemath.org/html/en/reference/curves/sage/schemes/elliptic_curves/ell_finite_field.html']
}

module.exports = chall
