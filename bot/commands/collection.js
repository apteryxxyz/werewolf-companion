// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");
const {
  legendary,
  epic,
  rare,
  uncommon,
  common
} = require("../settings/roles.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");
const collectables = new db.table("collectables");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let authorID = message.author.id;

  let legendaryRoles = collectables.get(
    `collectables_${authorID}.roles.legendary`
  );
  let epicRoles = collectables.get(`collectables_${authorID}.roles.epic`);
  let rareRoles = collectables.get(`collectables_${authorID}.roles.rare`);
  let uncommonRoles = collectables.get(
    `collectables_${authorID}.roles.uncommon`
  );
  let commonRoles = collectables.get(`collectables_${authorID}.roles.common`);

  if (legendaryRoles.includes("none")) {
    var legendaryLength =
      collectables.get(`collectables_${authorID}.roles.legendary`).length - 1;
  } else {
    var legendaryLength = collectables.get(
      `collectables_${authorID}.roles.legendary`
    ).length;
  }
  if (epicRoles.includes("none")) {
    var epicLength =
      collectables.get(`collectables_${authorID}.roles.epic`).length - 1;
  } else {
    var epicLength = collectables.get(`collectables_${authorID}.roles.epic`)
      .length;
  }
  if (rareRoles.includes("none")) {
    var rareLength =
      collectables.get(`collectables_${authorID}.roles.rare`).length - 1;
  } else {
    var rareLength = collectables.get(`collectables_${authorID}.roles.rare`)
      .length;
  }
  if (uncommonRoles.includes("none")) {
    var uncommonLength =
      collectables.get(`collectables_${authorID}.roles.uncommon`).length - 1;
  } else {
    var uncommonLength = collectables.get(
      `collectables_${authorID}.roles.uncommon`
    ).length;
  }
  if (commonRoles.includes("none")) {
    var commonLength =
      collectables.get(`collectables_${authorID}.roles.common`).length - 1;
  } else {
    var commonLength = collectables.get(`collectables_${authorID}.roles.common`)
      .length;
  }

  let collectionEmbed = new Discord.MessageEmbed()
    .setTitle("Role Collection")
    .setDescription(
      `To collect more roles from lootboxes, use \`${prefix}buy lootbox\` to buy one and \`${prefix}use lootbox\` to open it.`
    )
    .addField(
      `Legendary ${legendaryLength}/${legendary.length}`,
      legendaryRoles.join("\n").replace("none", "None")
    )
    .addField(
      `Epic ${epicLength}/${epic.length}`,
      epicRoles.join("\n").replace("none", "None")
    )
    .addField(
      `Rare ${rareLength}/${rare.length}`,
      rareRoles.join("\n").replace("none", "None")
    )
    .addField(
      `Uncommon ${uncommonLength}/${uncommon.length}`,
      uncommonRoles.join("\n").replace("none", "None")
    )
    .addField(
      `Common ${commonLength}/${common.length}`,
      commonRoles.join("\n").replace("none", "None")
    )
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.yellow);
  message.channel.send(collectionEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["roles", "r"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "collection",
  description: "View your all the collectable roles you have collected."
};
