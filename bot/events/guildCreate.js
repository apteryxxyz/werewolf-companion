// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
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
};

// ON MESSAGE ---------------------------------\\
module.exports = guild => {
    if (guild.id === "414179354814185498") return;

    let guildEmbed = new Discord.MessageEmbed()
        .setTitle(`Hello!`)
        .setDescription(
            `Thanks for adding me to your server, ${guild.name}! I am just here to let you know about a few things.`
        )
        .addField(
            `Settings`,
            `The bot has a few settings that change how the bot works in your server. To view and change those settings use the \`${prefix}settings\` command.`
        )
        .addField(
            `Suggestions`,
            `If you have any suggestions for this bot or the Werewolf Companion app, feel free to leave them in the support server.You can get a link using the \`${prefix}support\` command.`
        )
        .setColor(colour.pink);
    guild.owner.send(guildEmbed);

    log("New guild added: " + guild.name);

    let missingPermError = settings.get(`settings_${guild.id}.errors.missingPermissions`);
    let invalidCommandError = settings.get(`settings_${guild.id}.errors.invalidCommand`);
    let musicCommands = settings.get(`settings_${guild.id}.commands.music`);

    if (missingPermError == null) {
        settings.set(`settings_${guild.id}.errors.missingPermissions`, true);
    }
    if (invalidCommandError == null) {
        settings.set(`settings_${guild.id}.errors.invalidCommand`, true);
    }
    if (musicCommands == null) {
        settings.set(`settings_${guild.id}.commands.music`, true);
    }
};
