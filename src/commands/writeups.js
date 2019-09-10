const path = require("path");
const { getBotConfig } = require(path.join(__dirname, "../util/util"));
const allChalls = require(path.join(__dirname, "../challs/index"));
const csv = require('csvtojson');

const csvFilePath = "writeups.csv"

const { themecolour } = getBotConfig();

module.exports = async function writeups(msg, args) {
  /*
        Displays writeups for a given challenge
    */

  var challid = args[0];
  var challData = allChalls[challid];

  if (!challData) {
    msg.channel.send("Invalid challenge id!");
    return false;
  }


  let writeupJsonArray = await csv().fromFile(csvFilePath);

  writeupJsonArray = writeupJsonArray.filter(function (writeup) {
    return writeup.chall == challid
  })

  console.log(writeupJsonArray)
  if (!(writeupJsonArray.length)) {
    msg.channel.send(`${challid} doesn't have any writeups yet! Solve the challenge and add one!`);
    return false;
  }

  var { title, points } = challData

  const links = writeupJsonArray
    .map(x => `[${x.name}](${x.link})`)

  console.log(links.join("\n"))

  var embed = {
    title: `Writeups for ${title} (${challid} [${points}])`,
    description: links.join("\n"),
    timestamp: new Date().toISOString(),
    color: themecolour
  };

  msg.channel.send({ embed });
};
