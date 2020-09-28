// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const emoji = require("../settings/emojis.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");
const balance = new db.table("balance");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let authorID = message.author.id;

  let authorGold = balance.get(`balance_${authorID}.gold`);
  let shopEmbed = new Discord.MessageEmbed()
    .setTitle("Shop")
    .setDescription(
      `To buy an item use \`${prefix}buy <item> [quantity]\`. You currently have ${authorGold} gold.\nView what you have in your inventory using the \`${prefix}inventory\` command.`
        .replace("null", 0)
        .replace("undefined", 0)
    )
    .addField(
      `Items`,
      `${emoji.lootboxes.lootbox} **Lootbox** - 100 Gold\nBuy and open a lootbox and you'll get a chance to get either roses, gems or a collectable role.\n${emoji.lootboxes.roselootbox} **Crimson Lootbox** - 10 Roses\nBuy and open a crimson lootbox and you'll get more gold, roses or gems than a regular lootbox or a higher chance to get a better collectable role.\n${emoji.economy.rose} **Rose** - 25 Gold\nSend a rose to a friend which they can use to buy items that can only be bought with roses.`
    )
    .addField(
      `Talisman`,
      `${emoji.items.talisman} **Role Talisman** - 25 gold\nWhen used, the next lootbox you open will be guaranteed to give you a collectable role, one that you do not have yet.`
    )
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.yellow);

  message.channel.send(shopEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["store", "s"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "shop",
  description: "View the shop and things you can buy"
};
