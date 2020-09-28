// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const emoji = require("../settings/emojis.json");

// DEFINE DATABASES ----------------------------\\
const balance = new db.table("balance");
const prestige = new db.table("prestige");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  if (message.mentions.users.first()) {
    var authorID = message.mentions.users.first().id;
    var author = message.mentions.users.first();
  } else {
    var authorID = message.author.id;
    var author = message.author;
  }

  let gold = balance.get(`balance_${authorID}.gold`);
  let roses = balance.get(`balance_${authorID}.roses`);
  let gems = prestige.get(`prestige_${authorID}.gems`);

  let balanceEmbed = new Discord.MessageEmbed()
    .setTitle(`${author.username}'s Balance`)
    /*.setDescription(
      `\`\`\`IMPORTANT: The economy system is going to be reset in the near future. Join the support server or use the ${prefix}prestige command for more information.\`\`\`\nTo earn more gold use \`${prefix}work\` and to see what you can buy use \`${prefix}shop\`.`
    )*/
    .addField(
      `${emoji.economy.gold} Gold`,
      `${gold}`.replace("null", 0).replace("undefined", 0),
      true
    )
    .addField(
      `${emoji.economy.rose} Roses`,
      `${roses}`.replace("null", 0).replace("undefined", 0),
      true
    )
    .addField(
      `${emoji.economy.gem} Gems`,
      `${gems}`.replace("null", 0).replace("undefined", 0),
      true
    )
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.yellow);
  message.channel.send(balanceEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["bal", "b"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "balance",
  description:
    "Returns your gold, roses and gems balance or someones balances.",
  usage: "[mention]",
  example: "@Apteryx#9879"
};
