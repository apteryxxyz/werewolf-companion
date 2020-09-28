// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const emoji = require("../settings/emojis.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// DEFINE COMMAND ------------------------------\\
const cmds = new Discord.MessageEmbed()
  .setTitle("Command List")
  .setDescription(
    `Use \`${prefix}help [command]\` for more detailed information on a command like; aliases, usage, usage example and cooldown.\n\nReact with the corresponding emoji to select a category.\n🐺 Werewolf Online\n💸 Currency Commands\n🧸 Items & Collectables\n🔎 Search & Images Commands\n🔧 Core & Utility Commands\n🛡️ Server & Moderation Commands\n🎵 Music Commands`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

const wwoCmds = new Discord.MessageEmbed()
  .setTitle(`🐺 Werewolf Online Commands`)
  .setDescription(
    `\`${prefix}abbreviations\` - Complete list of Werewolf Online role abbreviations.\n\`${prefix}tips\` - Community submitted tips and tricks for roles within Werewolf Online.\n\`${prefix}sideservers\` - List of Werewolf Online sideservers.\n\`${prefix}meme\` - Generates a random Werewolf Online meme.\n\`${prefix}subreddit\` - Gets a random image from the r/werewolfonline subreddit.`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

const currencyCmds = new Discord.MessageEmbed()
  .setTitle(`💸 Currency Commands`)
  .setDescription(
    `\`${prefix}balance [mention]\` - Checks your own balance or someone elses balance.\n\`${prefix}work\` - Every hour you can earn between 10 and 20 gold.\n`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

const itemCmds = new Discord.MessageEmbed()
  .setTitle(`🧸 Items & Collectables`)
  .setDescription(
    `\`${prefix}shop\` - Shows you the shop which contains things you can buy, like lootboxes, roses and talismans.\n\`${prefix}buy <item> [quantity]\` - Buy an item from the shop.\n\`${prefix}inventory [mention]\` - Shows you everything you have in your inventory or what someone else has in their inventory.\n\`${prefix}use <item>\` - Use an item you have in your inventory.\n\`${prefix}collection\` - Returns a list of all the collectable roles you have collected.`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

const searchCmds = new Discord.MessageEmbed()
  .setTitle("🔎 Search & Images Commands")
  .setDescription(
    `\`${prefix}cat\` - Returns a random image of cat.\n\`${prefix}dog\` - Returns a random image of dog.`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

const coreCmds = new Discord.MessageEmbed()
  .setTitle("🔧 Core & Utility Commands")
  .setDescription(
    `\`${prefix}help [command]\` - Returns this message or returns information on the inputted command.\n\`${prefix}links\` - Important Werewolf Companion links like the bots invite, the apps Google Play link and the support server link.\n\`${prefix}serverinfo\` - Gets information about the server this is used in.`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

const modCmds = new Discord.MessageEmbed()
  .setTitle("🛡️ Server & Moderation Commands")
  .setDescription(
    `\`${prefix}settings [setting]\` - View and change server based settings.`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);

/*const musicCmds = new Discord.MessageEmbed()
  .setTitle("🎵 Music Commands")
  .setDescription(
    `\`${prefix}play <song>\` - Play a song from YouTube into a voice channel.\n\`${prefix}skip\` - Skip the currently playing song.\n\`${prefix}stop\` - Stops the music and removes all songs from the queue.\n\`${prefix}loop\` - Loop all the songs currently in the queue.\n\`${prefix}queue\` - View the songs in the queue, which are next to play.\n\`${prefix}volume [number]\` - Change the volume at which the music plays at, from 0 to 200.\n\`${prefix}pause\` - Pause the currently playing song.\n\`${prefix}resume\` - Resume the song which was paused.\n\`${prefix}lyrics\` - View the lyrics for a song, if it has any.\n`
  )
  .setFooter("Werewolf Companion")
  .setTimestamp()
  .setColor(colour.yellow);*/

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  /*const { commands } = message.client;
  if (!args.length) {
    function help() {
      message.channel.send(cmds).then(sentEmbed => {
        sentEmbed.react("🐺"); // wwo
        sentEmbed.react("💸"); // cur
        sentEmbed.react("🧸"); // item
        sentEmbed.react("🔎"); // search
        sentEmbed.react("🔧"); // core
        sentEmbed.react("🛡️"); // mod
        sentEmbed.react("🎵"); // music

        let filter = (reaction, user) => {
          return (
            ["🐺", "💸", "🧸", "🔎", "🔧", "🛡️", "🎵"].includes(
              reaction.emoji.name
            ) && user.id === message.author.id
          );
        };

        function removeReactions() {
          sentEmbed.reactions.removeAll();
        }

        sentEmbed
          .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
          .then(collected => {
            const reaction = collected.first();

            function back(cat) {
              removeReactions();
              sentEmbed.edit(cat).then(sentEmbed => {
                sentEmbed.react("⬅️");

                let filter = (reaction, user) => {
                  return (
                    ["⬅️"].includes(reaction.emoji.name) &&
                    user.id === message.author.id
                  );
                };

                sentEmbed
                  .awaitReactions(filter, {
                    max: 1,
                    time: 120000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    let reaction = collected.first();

                    function tipsFun2() {
                      removeReactions();
                      sentEmbed.edit(cmds).then(sentEmbed => {
                        sentEmbed.react("🐺"); // wwo
                        sentEmbed.react("💸"); // cur
                        sentEmbed.react("🧸"); // item
                        sentEmbed.react("🔎"); // search
                        sentEmbed.react("🔧"); // core
                        sentEmbed.react("🛡️"); // mod
                        sentEmbed.react("🎵"); // music

                        let filter = (reaction, user) => {
                          return (
                            ["🐺", "💸", "🧸", "🔎", "🔧", "🛡️", "🎵"].includes(
                              reaction.emoji.name
                            ) && user.id === message.author.id
                          );
                        };

                        sentEmbed
                          .awaitReactions(filter, {
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                          })
                          .then(collected => {
                            let reaction = collected.first();

                            if (reaction.emoji.name === "🐺") {
                              back(wwoCmds);
                            } else if (reaction.emoji.name === "💸") {
                              back(currencyCmds);
                            } else if (reaction.emoji.name === "🧸") {
                              back(itemCmds);
                            } else if (reaction.emoji.name === "🔎") {
                              back(searchCmds);
                            } else if (reaction.emoji.name === "🔧") {
                              back(coreCmds);
                            } else if (reaction.emoji.name === "🛡️") {
                              back(modCmds);
                            } else if (reaction.emoji.name === "🎵") {
                              back(musicCmds);
                            }
                          })
                          .catch(collected => {
                            message.channel.send(
                              `No reaction added in time, command has been canceled!`
                            );
                            removeReactions();
                          });
                      });
                    }

                    if (reaction.emoji.name === "⬅️") {
                      removeReactions();
                      tipsFun2();
                    }
                  })
                  .catch(collected => {
                    removeReactions();
                  });
              });
            }

            if (reaction.emoji.name === "🐺") {
              back(wwoCmds);
            } else if (reaction.emoji.name === "💸") {
              back(currencyCmds);
            } else if (reaction.emoji.name === "🧸") {
              back(itemCmds);
            } else if (reaction.emoji.name === "🔎") {
              back(searchCmds);
            } else if (reaction.emoji.name === "🔧") {
              back(coreCmds);
            } else if (reaction.emoji.name === "🛡️") {
              back(modCmds);
            } else if (reaction.emoji.name === "🎵") {
              back(musicCmds);
            }
          })
          .catch(collected => {
            message.channel.send(
              `No reaction added in time, command has been canceled!`
            );
            removeReactions();
          });
      });
    }

    help();
  } else {
    let name = args[0].toLowerCase();
    let command =
      commands.get(name) ||
      commands.find(c => c.config.aliases && c.config.aliases.includes(name));
    if (!command) {
      return message.channel.send(`${args.join(" ")} not a valid command!`);
    } else {
      let helpEmbed = new Discord.MessageEmbed()
        .setTitle(`${prefix}${command.help.name} Information`)
        .setDescription(`\`\`\`${command.help.description}\`\`\``)
        .setColor(colour.yellow);

      if (command.config.aliases) {
        helpEmbed.addField(
          "Aliases",
          `\`${command.config.aliases.join("`, `")}\``,
          true
        );
      }
      if (command.help.usage) {
        helpEmbed.addField(
          "Usage",
          `\`${prefix}${command.help.name} ${command.help.usage}\``,
          true
        );
        helpEmbed.addField(
          "Example",
          `${prefix}${command.help.name} ${command.help.example}`,
          true
        );
      }
      if (command.help.cooldown) {
        helpEmbed.addField("Cooldown", `${command.help.cooldown}`, true);
      }

      message.channel.send(helpEmbed);
    }
  }*/

  const { commands } = message.client;
  if (!args.length) {
    let helpEmbed = new Discord.MessageEmbed()
      .setTitle("Command List")
      .addField(
        `🐺 Werewolf Online`,
        `\`${prefix}abbreviations\` - Complete list of Werewolf Online role abbreviations.\n\`${prefix}tips\` - Community submitted tips and tricks for roles within Werewolf Online.\n\`${prefix}sideservers\` - List of Werewolf Online sideservers.\n\`${prefix}meme\` - Generates a random Werewolf Online meme.\n\`${prefix}subreddit\` - Gets a random image from the r/werewolfonline subreddit.`
      )
      .addField(
        `💸 Currency`,
        `\`${prefix}balance [mention]\` - Checks your own balance or someone elses balance.\n\`${prefix}work\` - Every hour you can earn betwwen 10 and 20 gold.\n`
      )
      .addField(
        `🧸 Items & Collectables`,
        `\`${prefix}shop\` - Shows you the shop which contains things you can buy, like lootboxes, roses and talismans.\n\`${prefix}buy <item> [quantity]\` - Buy an item from the shop.\n\`${prefix}inventory [mention]\` - Shows you everything you have in your inventory or what someone else has in their inventory.\n\`${prefix}use <item>\` - Use an item you have in your inventory.\n\`${prefix}collection\` - Returns a list of all the collectable roles you have collected.`
      )
      .addField(
        "🔎 Search & Images",
        `\`${prefix}cat\` - Generates and sends a random image of a cat.\n\`${prefix}dog\` - Generates and sends a random image of a dog.`
      )
      .addField(
        "🔧 Core & Utilities",
        `\`${prefix}help [command]\` - Returns this message or returns information on the inputted command.\n\`${prefix}links\` - Important Werewolf Companion links like the bots invite, the apps Google Play link and the support server link.\n\`${prefix}serverinfo\` - Gets information about the server this is used in.\n\`${prefix}botinfo\` - Get information about this bot.`
      )
      .addField(
        "🛡️ Server & Moderation",
        `\`${prefix}settings [setting]\` - View and change server based settings.`
      )
      /*.addField(
        "🎵 Music",
        `\`${prefix}play <song>\` - Play a song from YouTube into a voice channel.\n\`${prefix}skip\` - Skip the currently playing song.\n\`${prefix}stop\` - Stops the music and removes all songs from the queue.\n\`${prefix}loop\` - Loop all the songs currently in the queue.\n\`${prefix}queue\` - View the songs in the queue, which are next to play.\n\`${prefix}volume\` - Change the volume at which the music plays at, from 0 to 200.\n\`${prefix}pause\` - Pause the currently playing song.\n\`${prefix}resume\` - Resume the song which was paused.\n\`${prefix}lyrics\` - View the lyrics for a song, if it has any.\n`
      )*/
      .setDescription(
        `Use \`${prefix}help [command]\` for more detailed information on a command like; aliases, usage, usage example and cooldown.`
      )
      .setFooter("Werewolf Companion")
      .setTimestamp()
      .setColor(colour.yellow);
    message.channel.send(helpEmbed);
  } else {
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.config.aliases && c.config.aliases.includes(name));
    if (!command) {
      return message.channel.send(`${args.join(" ")} not a valid command!`);
    } else {
      let helpEmbed = new Discord.MessageEmbed()
        .setTitle(`${prefix}${command.help.name} Information`)
        .setDescription(`\`\`\`${command.help.description}\`\`\``)
        .setColor(colour.yellow);

      if (command.config.aliases) {
        helpEmbed.addField(
          "Aliases",
          `\`${command.config.aliases.join("`, `")}\``,
          true
        );
      }
      if (command.help.usage) {
        helpEmbed.addField(
          "Usage",
          `\`${prefix}${command.help.name} ${command.help.usage}\``,
          true
        );
        helpEmbed.addField(
          "Example",
          `${prefix}${command.help.name} ${command.help.example}`,
          true
        );
      }
      if (command.help.cooldown) {
        helpEmbed.addField("Cooldown", `${command.help.cooldown}`, true);
      }

      message.channel.send(helpEmbed);
    }
  }
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["EMBED_LINKS"],
  aliases: ["h"],
  args: false
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "help",
  description:
    "List of my commands that can be used. Type the name of a command after to get information about that command.",
  usage: "[command]",
  example: "abbreviations"
};
