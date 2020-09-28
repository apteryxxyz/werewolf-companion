// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const emoji = require("../settings/emojis.json");

// DEFINE DATABASES ----------------------------\\
const balance = new db.table("balance");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["lb"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "leaderboard",
  description:
    "Returns your gold, roses and gems balance or someones balances.",
  usage: "[mention]",
  example: "@Apteryx#9879"
};