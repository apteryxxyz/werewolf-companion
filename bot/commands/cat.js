// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");
const randomPuppy = require("random-puppy");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const { catSubreddits } = require("../settings/subreddits.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let subreddit =
    catSubreddits[Math.floor(Math.random() * catSubreddits.length)];
  randomPuppy(subreddit).then(url => {
    let catEmbed = new Discord.MessageEmbed()
      .setTitle("Random Cat")
      .setImage(`${url}`)
      .setFooter(`Werewolf Companion`)
      .setTimestamp()
      .setColor(colour.yellow);
    message.channel.send(catEmbed);
  });
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["kitty", "kitten", "buddy", "c"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "cat",
  description:
    "Returns a random image of a cat from one of the cat subreddits."
};
