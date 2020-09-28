// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const { one, two } = require("../settings/memes.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let randomNumber1 = Math.floor(Math.random() * 100);

  if (randomNumber1 < 10) {
    var memeURL = one[Math.floor(Math.random() * one.length)];
  } else {
    var memeURL = two[Math.floor(Math.random() * two.length)];
  }
  let memeEmbed = new Discord.MessageEmbed()
    .setTitle("Random Meme")
    .setDescription(
      "**[Watch more memes here!](https://www.youtube.com/playlist?list=PLcqKbprldaWXZjm_c-6IYg6PLGCyl8RmT)**"
    )
    .setImage(memeURL)
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.yellow);

  let randomNumber2 = Math.floor(Math.random() * 100);
  if (randomNumber2 < 10) {
    memeEmbed.setFooter(
      `Submit your own Werewolf Online memes for the bot in the support server, get a link using the *support command.`
    );
  }
  message.channel.send(memeEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["m"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "meme",
  description: "Generates a random Werewolf Online meme."
};
