// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// DEFINE COMMAND ------------------------------\\
const linksEmbed = new Discord.MessageEmbed()
  .setTitle("Werewolf Companion Links")
  .setDescription(
    "**[Invite The Bot](https://discordapp.com/oauth2/authorize?client_id=643770027761336321&scope=bot&permissions=3537984)\n[Download The App](https://play.google.com/store/apps/details?id=com.blackbox.wwoc)\n[Join The Support Server](https://discord.gg/BKeapDB)**"
  )
  .setFooter("Werewolf Companion")
  .setColor(colour.yellow);

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  linksEmbed.setTimestamp();
 message.channel.send(linksEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["invite", "server", "app", "support", "l"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "links",
  description:
    "A Discord link to invite the bot, a Google Play link to downlaod the app and an invite link to join the support server."
};
