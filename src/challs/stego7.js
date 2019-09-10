const path = require("path");
const csv = require("csv-parser");
const fs = require("fs");
const { getBotConfig, genChallEmbed } = require(path.join(
  __dirname,
  "../util/util"
));
const { themecolour } = getBotConfig();

const description = `
You are a secret agent tasked with investigating the famous dissident Merlin.
Can you find out what he's been up to?

[Merlin](https://drive.google.com/open?id=1fkfLvsWzMizumB08gliK9aEDM4Yjf9bk)
`;

var chall = {
  challid: "stego7",
  title: "Magic Trick",
  category: "Steganography",
  points: 20,
  authorid: "219792140472025089",
  authorName: "John",
  flag: "7e965963c5799f44f7cff440238f0fc3b921c6be2c0d78411c1ab34b9c9d39f2",
  description,
  desc: async function(msg) {
    let {
      challid,
      title,
      category,
      points,
      authorid,
      authorName,
      description
    } = chall;

    var descEmbed = await genChallEmbed({
      challid,
      title,
      category,
      points,
      authorid,
      authorName,
      themecolour,
      description
    });

    msg.channel.send({ embed: descEmbed });
  },
  notes: []
};

module.exports = chall;
