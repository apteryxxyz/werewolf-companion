// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, Util } = require("discord.js");
const { join } = require("path");
const fs = require("fs");
const db = require(`quick.db`);

const config = require("./settings/config.json");
require("./util/eventLoader.js")(client);

// DEFINE SETTINGS -----------------------------\\
const { prefix, statuses } = require("./settings/config.json");
client.prefix = config.prefix;

// DEFINE FUNCTIONS ----------------------------\\
function log(message) {
  if (message instanceof Error) {
    message = message.stack;
  }
  let time = new Date().toLocaleTimeString("en-US", {
    timeZone: "Pacific/Auckland"
  });
  console.log(`[${time}] ${message}`);
}

// START BOT ----------------------------------\\
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const files = fs
  .readdirSync("/home/Apteryx/Projects/werewolf/bot/commands/")
  .filter(file => file.endsWith(".js"));

files.forEach(file => {
  let command = require(`./commands/${file}`);
  client.commands.set(command.help.name, command);
  command.config.aliases.forEach(alias => {
    client.aliases.set(alias, command.help.name);
  });
});

client.login(process.env.WWC_DISCORD_TOKEN);
