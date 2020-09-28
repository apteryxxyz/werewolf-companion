// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// DEFINE COMMAND ------------------------------\\
const abbreviationsEmbed = new Discord.MessageEmbed()
  .setTitle("Role Abbreviations")
  .addField(
    "Village",
    "Aura Seer = AS, Aura\nBodyguard = BG\nBeast Hunter = BH\nDetective = Det\nDoctor = Doc\nGrumpy Grandma = GG\nGunner = Gun\nJailer = Jail\nMedium = Med\nPacifist = Paci\nSeer Apprentice = Seer App, SA, App\nTough Guy = TG\nMarksman = MM, Marks\nRed Lady = RL\nSpirit Seer = SS\nFlower Child = FC"
  )
  .addField(
    "Werewolves",
    "Werewolf = WW\nAlpha Werewolf = AWW, Alpha\nWolf Seer = WWS, WS\nJunior Werewolf = JWW, JrWW\nWolf Shaman = Sham\nWerewolf Berserk = WWB, Bers\nNightmare Werewolf = NWW, NMWW\nSorcerer = Sorc\nGuardian Wolf = GWW, GW"
  )
  .addField(
    "Solo",
    "Arsonist = Ars, Arso\nBomber = BB, Bomb\nCannibal = CB, Canni\nCorruptor = Corr\nHeadhunter = HH\nSect Leader = SL, Sect\nSerial Killer = SK\nZombie = Zomb, Zb"
  )
  .setFooter("Werewolf Companion")
  .setColor(colour.yellow);

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  abbreviationsEmbed.setTimestamp();
  message.channel.send(abbreviationsEmbed);
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["abb", "a"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "abbreviations",
  description:
    "A list of abbreviations for nearly every role in Werewolf Online, if they have one."
};
