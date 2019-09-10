const path = require("path")
const { getBotConfig } = require(path.join(__dirname, "../util/util"))
const allChalls = require(path.join(__dirname, "../challs/index"))
const csv = require('csvtojson')

const csvFilePath = "../writeups.csv"
var writeupJsonArray
(async () => {
    writeupJsonArray = await csv().fromFile(path.join(__dirname, csvFilePath))
})()

const { themecolour } = getBotConfig()

module.exports = async function writeups(msg, args) {
   /*
        Displays writeups for a given challenge
   */

    var challid = args[0]
    var challData = allChalls[challid]

    if (!challData) {
        msg.channel.send("Invalid challenge id!")
        return false
    }


    var filteredWriteups = writeupJsonArray
        .filter(({chall}) => chall == challid)
        .map(({name, link}) => `[${name}](${link})`)

    if (!filteredWriteups) {
        msg.channel.send(`${challid} doesn't have any writeups yet! Solve the challenge and add one!`);
        return false
    }

    var { title, points } = challData

    var embed = {
        title: `Writeups for ${title} (${challid} [${points}])`,
        description: filteredWriteups.join("\n"),
        timestamp: new Date().toISOString(),
        color: themecolour
    }

    msg.channel.send({ embed })
}
