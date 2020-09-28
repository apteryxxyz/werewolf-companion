// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const balance = new db.table("balance");
const inventory = new db.table("inventory");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  function isInt(n) {
    return n % 1 === 0;
  }

  let authorID = message.author.id;
  let gold = balance.get(`balance_${authorID}.gold`);
  let roses = balance.get(`balance_${authorID}.roses`);
  let gems = balance.get(`balance_${authorID}.gems`);

  let item = args[0].toLowerCase();

  if (item === "lootbox" || item === "lb") {
    if (isNaN(args[1]) || !isInt(args[1]) || args[1] == 1 || args[1] < 1) {
      if (gold > 99) {
        balance.subtract(`balance_${authorID}.gold`, 100);
        inventory.add(`inventory_${authorID}.lootboxes.gold`, 1);
        message.channel.send(
          `You have successfully purchased a **lootbox** with 100 gold!`
        );
      } else {
        message.channel.send(
          `You don't have enough gold to purchase a **lootbox**!`
        );
      }
    } else {
      let amount = args[1].replace(/^0+/, "");
      if (gold > amount * 100 - 1) {
        balance.subtract(`balance_${authorID}.gold`, amount * 100);
        inventory.add(`inventory_${authorID}.lootboxes.gold`, amount);
        message.channel.send(
          `You have successfully purchased **${amount} lootboxes** with ${amount *
            100} gold!`
        );
      } else {
        message.channel.send(
          `You don't have enough gold to purchase ${amount} lootboxes!`
        );
      }
    }
  } else if (item === "crimson" || item === "c") {
    if ((args[1] && args[1].toLowerCase() == "lootbox") || "lb") {
      if (isNaN(args[2]) || !isInt(args[2]) || args[2] == 1 || args[2] < 1) {
        if (roses > 9) {
          balance.subtract(`balance_${authorID}.roses`, 10);
          inventory.add(`inventory_${authorID}.lootboxes.rose`, 1);
          message.channel.send(
            `You have successfully purchased a **crimson lootbox** with 10 roses!`
          );
        } else {
          message.channel.send(
            `You don't have enough received roses to purchase a crimson lootbox!`
          );
        }
      } else {
        let amount = args[2].replace(/^0+/, "");
        if (roses > amount * 10 - 1) {
          balance.subtract(`balance_${authorID}.roses`, amount * 10);
          inventory.add(`inventory_${authorID}.lootboxes.rose`, amount);
          message.channel.send(
            `You have successfully purchased **${amount} crimson lootboxes** with ${amount *
              10} roses!`
          );
        } else {
          message.channel.send(
            `You don't have enough received roses to purchase ${amount} crimson lootboxes!`
          );
        }
      }
    } else {
      message.channel.send(
        `${args.join(
          " "
        )} is not a valid item, use \`${prefix}shop\` to view what you can buy!`
      );
    }
  } /*else if (item === "lapidary" || item === "l") {
    if ((args[1] && args[1].toLowerCase() == "lootbox") || "lb") {
      if (isNaN(args[2]) || !isInt(args[2]) || args[2] == 1 || args[2] < 1) {
        if (gems > 0) {
          balance.subtract(`balance_${authorID}.gems`, 1);
          inventory.add(`inventory_${authorID}.lootboxes.gem`, 1);
          message.channel.send(
            `You have successfully purchased a **lapidary lootbox** with a gem!`
          );
        } else {
          message.channel.send(
            `You don't have enough gems to purchase a lapidary lootbox!`
          );
        }
      } else {
        let amount = args[2].replace(/^0+/, "");
        if (gems > amount * 1 - 1) {
          balance.subtract(`balance_${authorID}.gems`, amount * 1);
          inventory.add(`inventory_${authorID}.lootboxes.gem`, amount);
          message.channel.send(
            `You have successfully purchased **${amount} lapidary lootboxes** with ${amount *
              10} gems!`
          );
        } else {
          message.channel.send(
            `You don't have enough gems to purchase ${amount} lapidary lootboxes!`
          );
        }
      }
    } else {
      message.channel.send(
        `${args.join(
          " "
        )} is not a valid item, use \`${prefix}shop\` to view what you can buy!`
      );
    }
  }*/ else if (
    item === "rose"
  ) {
    if (isNaN(args[1]) || !isInt(args[1]) || args[1] == 1 || args[1] < 1) {
      if (gold > 24) {
        balance.subtract(`balance_${authorID}.gold`, 25);
        inventory.add(`inventory_${authorID}.roses`, 1);
        message.channel.send(
          `You have successfully purchased a **rose** with 25 gold!`
        );
      } else {
        message.channel.send(`You don't have enough gold to purchase a rose!`);
      }
    } else {
      let amount = args[1].replace(/^0+/, "");
      if (gold > amount * 25 - 1) {
        balance.subtract(`balance_${authorID}.gold`, amount * 25);
        inventory.add(`inventory_${authorID}.roses`, amount);
        message.channel.send(
          `You have successfully purchased **${amount} roses** with ${amount *
            25} gold!`
        );
      } else {
        message.channel.send(
          `You don't have enough gold to purchase ${amount} roses!`
        );
      }
    }
  } else if (item === "role") {
    if (args[1] && args[1].toLowerCase() == "talisman") {
      if (isNaN(args[2]) || !isInt(args[2]) || args[2] == 1 || args[2] < 1) {
        if (gold > 24) {
          balance.subtract(`balance_${authorID}.gold`, 25);
          inventory.add(`inventory_${authorID}.talismans.role`, 1);
          message.channel.send(
            `You have successfully purchased a **role talisman** with 25 gold!`
          );
        } else {
          message.channel.send(
            `You don't have enough gold to purchase a role talisman!`
          );
        }
      } else {
        let amount = args[2].replace(/^0+/, "");
        if (gold > amount * 25 - 1) {
          balance.subtract(`balance_${authorID}.gold`, amount * 25);
          inventory.add(`inventory_${authorID}.talismans.role`, amount);
          message.channel.send(
            `You have successfully purchased **${amount} role talismans** with ${amount *
              25} gold!`
          );
        } else {
          message.channel.send(
            `You don't have enough gold to purchase ${amount} role talismanss!`
          );
        }
      }
    } else {
      message.channel.send(
        `${args.join(
          " "
        )} is not a valid item, use \`${prefix}shop\` to view what you can buy!`
      );
    }
  } else {
    message.channel.send(
      `${args.join(
        " "
      )} is not a valid item, use \`${prefix}shop\` to view what you can buy!`
    );
  }
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ["buy"],
  args: true
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "buy",
  description: "Buys an item from the shop and adds it to your inventory.",
  usage: "<item> [quantity]",
  example: "lootbox 3"
};
