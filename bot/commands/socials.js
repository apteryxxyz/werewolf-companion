// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// DEFINE COMMAND ------------------------------\\
const mediaEmbed = new Discord.MessageEmbed()
  .setTitle("Werewolf Online Socials")
  .addField(
    "Discord Server",
    "Chat with other Werewolf Online players in the Discord commuinty.\n**[Join](https://discord.gg/wwo)**"
  )
  .addField(
    "Subreddit",
    "The subreddit for Werewolf Online. Exclusive news, leaks and giveaways aswell as a place to share anything WWO related.\n**[Follow](https://www.reddit.com/r/werewolfonline/)**"
  )
  .addField(
    "Instagram",
    "The official Instagram page for Werewolf Online with updates, giveaways and posts made by the WWO community!\n**[Follow](https://www.instagram.com/werewolf.online/)**"
  )
  .addField(
    "Twitter",
    "Official Twitter account for Werewolf Online, giveaways are hosted here.\n**[Follow](https://twitter.com/werewolf_app)**"
  )
  .addField(
    "Facebook",
    "Official Facebook page for Werewolf Online, giveaways are hosted here.\n**[Like](https://www.facebook.com/werewolf.apps/)**"
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  message.channel.send(mediaEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["media"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "socials",
  description: "List of links to Werewolf Online social networks."
};
