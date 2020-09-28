// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let serverinfoEmbed = new Discord.MessageEmbed()
    .setTitle("Server Information")
    .addField("Name", message.guild.name, true)
    .addField("ID", message.guild.id, true)
    .addField("Owner", message.guild.owner, true)
    .addField("Member Count", message.guild.memberCount, true)
    //.addField("Region", capitalize(message.guild.region), true)
    .addField(
      "Verification Level",
      message.guild.verificationLevel.replace("_", " "),
      true
    )
    .addField(
      "Content Filter",
      message.guild.explicitContentFilter.replace("_", " "),
      true
    )
    .setImage(message.guild.iconURL())
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.yellow);
  message.channel.send(serverinfoEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["EMBED_LINKS"],
  aliases: ["guildinfo", "si", "gi"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "serverinfo",
  description: "Display information about the server this command is used in."
};
