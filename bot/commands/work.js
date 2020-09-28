// REQUIRE PACKAGES --------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// REQUIRE FUNCTIONS -------------------------- \\
const { msConversion } = require("../models/time.js");

// REQUIRE SETTINGS --------------------------- \\
const { jobs } = require("../settings/jobs.json");

// DEFINE DATABASES --------------------------- \\
const balance = new db.table("balance");
const cooldowns = new db.table("cooldowns");

// RUN COMMAND -------------------------------- \\
exports.run = (client, message, args) => {
  let authorID = message.author.id;

  let now = new Date();
  let timeNow = Date.now();
  let lastUsage = cooldowns.get(`cooldowns_${authorID}.work`);

  function workFun(min, max) {
    let job = jobs[Math.floor(Math.random() * jobs.length)];
    let payment = Math.floor(Math.random() * (max - min)) + min;
    cooldowns.set(`cooldowns_${authorID}.work`, timeNow);
    balance.add(`balance_${authorID}.gold`, Math.floor(payment));
    message.channel.send(`You have worked ${job} for **${Math.floor(payment)} gold**!`);
  }

  if (lastUsage < timeNow - 3600000) {
    workFun(10, 20);
  } else {
    // time = timeNow - lastUsage;
    let time = lastUsage + 3600000 - timeNow;
    message.channel.send(
      `You can only work once every hour, try again in **${msConversion(
        `${time}`
      )}**!`
    );
  }
};

// COMMAND CONFIG ----------------------------- \\
exports.config = {
  enabled: true,
  guildOnly: false,
  perms: ["EMBED_LINKS"],
  aliases: ["job", "w"]
};

// COMMAND HELP ------------------------------- \\
exports.help = {
  name: "work",
  description:
    "Earn between 10 to 20 gold every hour when you use this command.",
  cooldown: "60m"
};
