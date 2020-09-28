// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");
const randomPuppy = require("random-puppy");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const { wwoSubreddits } = require("../settings/subreddits.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let subreddit =
    wwoSubreddits[Math.floor(Math.random() * wwoSubreddits.length)];
  randomPuppy(subreddit).then(url => {
    let imageEmbed = new Discord.MessageEmbed()
      .setTitle(`Random r/${subreddit} Image`)
      .setImage(`${url}`)
      .setFooter("Werewolf Companion")
      .setTimestamp()
      .setColor(colour.yellow);
    message.channel.send(imageEmbed);
  });
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["sub", "sr"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "subreddit",
  description:
    "Generates a random image from the subreddit r/werewolfonlinegame."
};
