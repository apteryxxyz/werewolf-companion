// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const emoji = require("../settings/emojis.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");
const inventory = new db.table("inventory");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  if (message.mentions.users.first()) {
    var authorID = message.mentions.users.first().id;
    var author = message.mentions.users.first();
  } else {
    var authorID = message.author.id;
    var author = message.author;
  }

  let roses = inventory.get(`inventory_${authorID}.roses`);
  let regularLB = inventory.get(`inventory_${authorID}.lootboxes.gold`);
  let roseLB = inventory.get(`inventory_${authorID}.lootboxes.rose`);
  let gemLB = inventory.get(`inventory_${authorID}.lootboxes.gem`);
  let roleTM = inventory.get(`inventory_${authorID}.talismans.role`);

  let items = [];
  let talismans = [];

  if (roses > 0) {
    items.push(`${emoji.economy.rose} **Rose** - ${roses}`);
  }
  if (regularLB > 0) {
    items.push(`${emoji.lootboxes.lootbox} **Lootbox** - ${regularLB}`);
  }
  if (roseLB > 0) {
    items.push(
      `${emoji.lootboxes.roselootbox} **Crimson Lootbox** - ${roseLB}`
    );
  }
  if (gemLB > 0) {
    items.push(`${emoji.lootboxes.gemlootbox} **Lapidary Lootbox** - ${gemLB}`);
  }
  if (roleTM > 0) {
    talismans.push(`${emoji.items.talisman} **Role Talisman** - ${roleTM}`);
  }

  if (items.length < 1) {
    items.push(`None`);
  }
  if (talismans.length < 1) {
    talismans.push(`None`);
  }

  let inventoryEmbed = new Discord.MessageEmbed()
    .setTitle(`${author.username}'s Inventory`)
    .setDescription(
      `View what you can buy using the \`${prefix}shop\` command.\nTo use an item use \`${prefix}use <item> [mention]\`.\nKey: item - quantity`
    )
    .addField(`Items`, items.join("\n"))
    .addField(`Talismans`, talismans.join("\n"))
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.yellow);

  message.channel.send(inventoryEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["inv", "i"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "inventory",
  description:
    "Returns what is in your inventory or what is in someones inventory.",
  usage: "[mention]",
  example: "@Apteryx#9879"
};
