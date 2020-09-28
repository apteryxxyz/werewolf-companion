// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// DEFINE COMMAND ------------------------------\\
const sideServersEmbed = new Discord.MessageEmbed()
  .setTitle("Side Servers")
  .addField(
    "Werewolf Online Information Server",
    "This is a server where you can get news and information about all the side servers.\n**[Join Server](https://discord.gg/Nc5NFVc)**",
    true
  )
  .addField(
    "Werewolf Online Bot Wonderland",
    "In this friendly community, you can frequently play Werewolf Online with other members or play with other bots.\n**[Join Server](https://discord.gg/GUCyBuu)**",
    true
  )
  .setFooter("Werewolf Companion")
  .setColor(colour.yellow);

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  sideServersEmbed.setTimestamp();
  message.channel.send(sideServersEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["ss"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "sideservers",
  description: "List of side servers of Werewolf Online."
};
