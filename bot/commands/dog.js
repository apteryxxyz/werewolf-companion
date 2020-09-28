// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");
const randomPuppy = require("random-puppy");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const { dogSubreddits } = require("../settings/subreddits.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let subreddit =
    dogSubreddits[Math.floor(Math.random() * dogSubreddits.length)];
  randomPuppy(subreddit).then(url => {
    let dogEmbed = new Discord.MessageEmbed()
      .setTitle("Random Dog")
      .setImage(`${url}`)
      .setFooter(`Werewolf Companion`)
      .setTimestamp()
      .setColor(colour.yellow);
    message.channel.send(dogEmbed);
  });
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["doggy", "doggo", "puppy", "d"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "dog",
  description: "Returns a random image of a dog from one of the dog subreddits."
};
