// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");
const path = require("path");
const fs = require("fs");
const rpi = require("raspberry-info");

// DEFINE SETTINGS -----------------------------\\
const { prefix, apteryx } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let commands = fs
    .readdirSync("/home/Apteryx/Projects/werewolf/bot/commands/")
    .filter(file => file.endsWith(".js"));

  let guilds = client.guilds.cache;
  var memberCount = 0;
  guilds.forEach(guild => {
    memberCount = memberCount + guild.members.cache.size;
  });

  let serverinfoEmbed = new Discord.MessageEmbed()
    .setTitle("Bot Information")
    .addField("Name", "Werewolf Companion", true)
    .addField("Prefix", prefix, true)
    .addField("Developer", client.users.cache.get(apteryx), true)
    .addField("Guild Count", client.guilds.cache.size, true)
    .addField("Total Member Count", memberCount, true)
    .addField("Number Of Commands", commands.length, true)
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.yellow);
    
  rpi.getCPUTemperature().then(output => serverinfoEmbed.addField("CPU Temperature", output, true));
  rpi.getGPUTemperature().then(output => serverinfoEmbed.addField("GPU Temperature", output, true));
  message.channel.send(serverinfoEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["EMBED_LINKS"],
  aliases: ["clientinfo", "bi", "ci"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "botinfo",
  description: "Display information about the server this command is used in."
};
