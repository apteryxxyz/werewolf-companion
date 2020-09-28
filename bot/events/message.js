// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const collectables = new db.table("collectables");
const settings = new db.table("settings");

// DEFINE FUNCTIONS ----------------------------\\
function log(message, discord) {
    if (message instanceof Error) {
        message = message.stack;
    }
    let time = new Date().toLocaleTimeString("en-US", {
        timeZone: "Pacific/Auckland"
    });
    console.log(`[${time}] ${message}`);
    if (discord == true) {
        let channel = client.channels.cache.get("711845867673485343");
        channel.send(`[${time}] ${message}`);
    }
}

// ON MESSAGE ---------------------------------\\
module.exports = message => {

    if (!message.content.startsWith(prefix) || message.content.endsWith(prefix) || message.guild.id === "414179354814185498" || message.author.bot) return;
    var command = message.content.split(" ")[0].slice(prefix.length).toLowerCase(),
        args = message.content.split(" ").slice(1), cmd;

    const client = message.client;
    if (client.commands.has(command)) cmd = client.commands.get(command);
    else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));

    let author = message.author;

    const embed = new Discord.MessageEmbed();
    embed.setFooter("Werewolf Companion");
    embed.setTimestamp();
    embed.setColor(colour.yellow);

    let updating = false;
    if (updating) {
        return message.channel.send(
            "The bot is currently being updated, because of this, all commands have been temporarily disabled."
        );
    };

    // if channel is text
    if (message.channel.type === "text") {
        if (
            !message.guild.me.permissionsIn(message.channel.id).has("SEND_MESSAGES")
        )
            return;

        var missingPermError = settings.get(
            `settings_${message.guild.id}.errors.missingPermissions`
        );
        var invalidCommandError = settings.get(
            `settings_${message.guild.id}.errors.invalidCommand`
        );
        var musicCommands = settings.get(
            `settings_${message.guild.id}.commands.music`
        );

        if (missingPermError == null) {
            settings.set(
                `settings_${message.guild.id}.errors.missingPermissions`,
                true
            );
        }
        if (invalidCommandError == null) {
            settings.set(`settings_${message.guild.id}.errors.invalidCommand`, true);
        }
        if (musicCommands == null) {
            settings.set(`settings_${message.guild.id}.commands.music`, true);
        }
    }

    let user = message.author.id;

    // if roles is none
    if (collectables.get(`collectables_${user}.roles.legendary`) == null) {
        collectables.push(`collectables_${user}.roles.legendary`, "none");
    }
    if (collectables.get(`collectables_${user}.roles.epic`) == null) {
        collectables.push(`collectables_${user}.roles.epic`, "none");
    }
    if (collectables.get(`collectables_${user}.roles.rare`) == null) {
        collectables.push(`collectables_${user}.roles.rare`, "none");
    }
    if (collectables.get(`collectables_${user}.roles.uncommon`) == null) {
        collectables.push(`collectables_${user}.roles.uncommon`, "none");
    }
    if (collectables.get(`collectables_${user}.roles.common`) == null) {
        collectables.push(`collectables_${user}.roles.common`, "none");
    }

    if (!cmd) {
        if (invalidCommandError == true) {
            return message.channel.send(
                `Invalid command, use \`${prefix}help\` to view the commands!`
            );
        } else {
            return;
        }
    }

    if (message.channel.type === "text") {
        let requiredPermissions = cmd.config.perms;
        let missingPermissions = [];

        let guildID = message.guild.id;
        let permError = settings.get(
            `settings_${guildID}.errors.missingPermissions`
        );

        if (requiredPermissions) {
            {
                requiredPermissions.forEach(perm => {
                    if (
                        !message.guild.me.permissionsIn(message.channel.id).has(perm) ||
                        !message.guild.me.hasPermission(perm)
                    ) {
                        missingPermissions.push(perm);
                    }
                });

                if (missingPermissions.length > 0) {
                    if (missingPermissions.length == 1) {
                        message.channel.send(
                            `I require the permission \`${missingPermissions.join(
                                "`, `"
                            )}\` in order to run this command!`
                        );
                        if (permError == true) {
                            message.guild.owner.send(
                                `Just letting you know I'm missing the permission \`${missingPermissions.join(
                                    "`, `"
                                )}\` which I require in order to execute the \`${prefix}${
                                cmd.help.name
                                }\` command.`
                            );
                        }
                    } else {
                        message.channel.send(
                            `I require the permissions \`${missingPermissions.join(
                                "`, `"
                            )}\` in order to run this command!`
                        );
                        if (permError == true) {
                            message.guild.owner.send(
                                `Just letting you know I'm missing the permissions \`${missingPermissions.join(
                                    "`, `"
                                )}\` which I require in order to execute the \`${prefix}${
                                cmd.help.name
                                }\` command.`
                            );
                        }
                    }
                    return;
                }
            }
        }
    }

    if (cmd.config.guildOnly && message.channel.type !== "text") {
        return message.reply("I can't execute that command inside DMs!");
    }

    if (cmd.config.enabled == false) {
        return message.channel.send("That command is currently disabled!");
    }

    if (cmd.config.args && !args.length) {
        let reply = `You didn't provide any arguments!`;
        if (cmd.help.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${cmd.help.name} ${cmd.help.usage}\``;
        }
        return message.channel.send(reply);
    }

    if (cmd) {
        cmd.run(client, message, args);
    }
};
