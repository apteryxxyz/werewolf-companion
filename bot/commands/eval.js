// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");
const rpi = require("raspberry-info")

// DEFINE SETTINGS ---------------------------- \\
const { apteryx } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const {
  legendary,
  epic,
  rare,
  uncommon,
  common
} = require("../settings/roles.json");
const { jobs } = require("../settings/jobs.json");
const { msConversion } = require("../models/time.js");

// DEFINE DATABASES --------------------------- \\
const balance = new db.table("balance");
const collectables = new db.table("collectables");
const inventory = new db.table("inventory");
const cooldowns = new db.table("cooldowns");
const prestige = new db.table("prestige");

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

// RUN COMMAND -------------------------------- \\
exports.run = (client, message, args) => {
  var deleteMessage = false;
  if (args[0] === "deletethis") var deleteMessage = true;

  let authorID = message.author.id;
  if (authorID !== apteryx) return;

  let evalEmbed = new Discord.MessageEmbed();
  evalEmbed.setFooter("Werewolf Companion");
  evalEmbed.setTimestamp();
  evalEmbed.setColor(colour.yellow);

  const code = args.join(" ").replace("deletethis", "");

  try {
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    evalEmbed.setTitle("Eval");
    evalEmbed.addField("Input", "```" + code + "```");
    evalEmbed.addField(
      "Output",
      "```" + clean(evaled) /*, { code: "xl" }*/ + "```"
    );
  } catch (err) {
    evalEmbed.setTitle("Eval");
    evalEmbed.addField("Input", "```" + code + "```");
    evalEmbed.addField("Output", "```" + clean(err) + "```");
  }
  if (deleteMessage === false) {
    message.channel.send(evalEmbed);
  }
  message.delete();
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["EMBED_LINKS"],
  aliases: ["eval"],
  args: true
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "eval",
  description: "Apteryxs command!",
  usage: "<input>",
  example: "input"
};
