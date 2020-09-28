// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");

// DEFINE SETTINGS -----------------------------\\
const { prefix, apteryx } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let authorID = message.author.id;
  let commandName = args[0].toLowerCase();
  let command =
    message.client.commands.get(commandName) ||
    message.client.commands.find(
      cmd => cmd.config.aliases && cmd.config.aliases.includes(commandName)
    );

  if (authorID !== apteryx)
    return message.channel.send("Only Apteryx#9879 can use this command!");

  if (!command)
    return message.channel.send(
      `There is no command with the name or alias \`${commandName}\`!`
    );

  delete require.cache[require.resolve(`./${command.help.name}.js`)];

  try {
    const newCommand = require(`./${command.help.name}.js`);
    message.client.commands.set(newCommand.help.name, newCommand);
  } catch (error) {
    console.log(error);
    return message.channel.send(
      `There was an error while reloading the command \`${command.help.name}\`\nError: \`${error.message}\``
    );
  }

  message.channel.send(
    `The command \`${command.help.name}\` has been reloaded!`
  );
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ["rl"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "reload",
  description:
    "A list of abbreviations for nearly every role in Werewolf Online, if they have one."
};
