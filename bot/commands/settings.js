// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix, apteryx } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let authorID = message.author.id;
  let ownerID = message.guild.owner.id;

  if (message.member.hasPermission("ADMINISTRATOR") || authorID == apteryx) {
    let guildID = message.guild.id;

    let musicCommands = settings.get(`settings_${guildID}.commands.music`);
    let missingPermError = settings.get(`settings_${guildID}.errors.missingPermissions`);
    let invalidCommandError = settings.get(`settings_${guildID}.errors.invalidCommand`);

    if (!args[0]) {
      let settingsEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Settings`)
        .setDescription(
          `Use \`${prefix}settings [setting]\` to toggle a setting on/off.`
        )
        .addField(
          `Missing Permissions Errors - ${missingPermError}`
            .replace("true", "ENABLED")
            .replace("false", "DISABLED"),
          `Whenever an error due to missing permissions occurs, the owner of the server will receive a DM letting them know about it. Error messages will still be sent within the channel the command was used in.\nYou will not receive any errors for the permission \`SEND_MESSAGES\`, this is for the people that disable this permission to stop people using the commands inside a specific channel.`
        )
        .addField(
          `Invalid Command Errors - ${invalidCommandError}`
            .replace("true", "ENABLED")
            .replace("false", "DISABLED"),
          `An error message will be returned when someone tries to execute a command that doesnt exist. When it is toggled off, it becomes useful if you have more than one bot in your server with the prefix \`${prefix}\`.`
        )
        /*
        .addField(
          `Music Commands - ${musicCommands}`
            .replace("true", "ENABLED")
            .replace("false", "DISABLED"),
          `When disabled, all music commands will be disabled, preventing users from playing songs within your server.`
        )
        */
        .setFooter("Werewolf Companion")
        .setTimestamp()
        .setColor(colour.yellow);
      message.channel.send(settingsEmbed);
    } else if (args[0].toLowerCase() === "music") {
      if (args[1] && args[1].toLowerCase() === "commands") {
        if (musicCommands === true) {
          settings.set(`settings_${guildID}.commands.music`, false);
          message.channel.send(`Music commands have been disabled!`);
        } else {
          settings.set(`settings_${guildID}.commands.music`, true);
          message.channel.send(`Music commands have been enabled!`);
        }
      }
    } else if (args[0].toLowerCase() === "missing") {
      if (args[1] && args[1].toLowerCase() === "permissions") {
        if (args[2] && args[2].toLowerCase() === "errors") {
          if (missingPermError === true) {
            settings.set(`settings_${guildID}.errors.missingPermissions`, false);
            message.channel.send(
              `The setting 'permission errors' has been toggled off.`
            );
          } else {
            settings.set(`settings_${guildID}.errors.missingPermissions`, true);
            message.channel.send(
              `The setting 'permission errors' has been toggled on.`
            );
          }
        } else {
          message.channel.send(
            `${args.join(
              " "
            )} is not a valid setting, use \`${prefix}settings\` to view what settings you can change!`
          );
        }
      } else {
        message.channel.send(
          `${args.join(
            " "
          )} is not a valid setting, use \`${prefix}settings\` to view what settings you can change!`
        );
      }
    } else if (args[0].toLowerCase() === "invalid") {
      if (args[1] && args[1].toLowerCase() === "command") {
        if (args[2] && args[2].toLowerCase() === "errors") {
          if (invalidCommandError === true) {
            settings.set(`settings_${guildID}.errors.invalidCommand`, false);
            message.channel.send(
              `The setting 'invalid command errors' has been toggled off.`
            );
          } else {
            settings.set(`settings_${guildID}.errors.invalidCommand`, true);
            message.channel.send(
              `The setting 'invalid command errors' has been toggled on.`
            );
          }
        } else {
          message.channel.send(
            `${args.join(
              " "
            )} is not a valid setting, use \`${prefix}settings\` to view what settings you can change!`
          );
        }
      } else {
        message.channel.send(
          `${args.join(
            " "
          )} is not a valid setting, use \`${prefix}settings\` to view what settings you can change!`
        );
      }
    } else {
      message.channel.send(
        `${args.join(
          " "
        )} is not a valid setting, use \`${prefix}settings\` to view what settings you can change!`
      );
    }
  } else {
    message.channel.send(
      `Only the server admins can edit the server settings!`
    );
  }
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["EMBED_LINKS"],
  aliases: ["setting"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "settings",
  description: "View and change server based settings.",
  usage: "[setting]",
  example: "missing permission errors"
};
