// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const {
  legendary,
  epic,
  rare,
  uncommon,
  common
} = require("../settings/roles.json");

// DEFINE DATABASES ----------------------------\\
const balance = new db.table("balance");
const inventory = new db.table("inventory");
const collectables = new db.table("collectables");

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  let authorID = message.author.id;

  let item = args[0].toLowerCase();

  let legendaryRoles = collectables.get(
    `collectables_${authorID}.roles.legendary`
  );
  let epicRoles = collectables.get(`collectables_${authorID}.roles.epic`);
  let rareRoles = collectables.get(`collectables_${authorID}.roles.rare`);
  let uncommonRoles = collectables.get(
    `collectables_${authorID}.roles.uncommon`
  );
  let commonRoles = collectables.get(`collectables_${authorID}.roles.common`);

  let activeTalisman = inventory.get(`inventory_${authorID}.talismans.active`);

  function randomRole(legendaryOdds, epicOdds, rareOdds, uncommonOdds) {
    let randomNumber = Math.floor(Math.random() * 100);

    if (randomNumber < legendaryOdds) {
      let role = legendary[Math.floor(Math.random() * legendary.length)];
      let gold = 150;
      if (legendaryRoles.includes(role)) {
        if (activeTalisman == undefined) {
          message.channel.send(
            `You opened a lootbox and recieved the **legendary** role, **${role}**! You already have this so instead, you will recieve **${gold} gold**!`
          );
          balance.add(`${authorID}.gold`, gold);
        } else if (activeTalisman == "role") {
          randomRole(legendaryOdds, epicOdds, rareOdds, uncommonOdds);
        }
      } else {
        message.channel.send(
          `You opened a lootbox and recieved the **legendary** role, **${role}**, it has been added to your collection!`
        );
        if (legendaryRoles.includes("none")) {
          collectables.delete(`collectables_${authorID}.roles.legendary`);
        }
        collectables.push(`collectables_${authorID}.roles.legendary`, role);
      }
    } else if (randomNumber < epicOdds) {
      let role = epic[Math.floor(Math.random() * epic.length)];
      let gold = 125;
      if (epicRoles.includes(role)) {
        if (activeTalisman == undefined) {
          message.channel.send(
            `You opened a lootbox and recieved the **epic** role, **${role}**! You already have this so instead, you will recieve **${gold} gold**!`
          );
          balance.add(`balance_${authorID}.gold`, gold);
        } else if (activeTalisman == "role") {
          randomRole(legendaryOdds, epicOdds, rareOdds, uncommonOdds);
        }
      } else {
        message.channel.send(
          `You opened a lootbox and recieved the **epic** role, **${role}**, it has been added to your collection!`
        );
        if (epicRoles.includes("none")) {
          collectables.delete(`collectables_${authorID}.roles.epic`);
        }
        collectables.push(`collectables_${authorID}.roles.epic`, role);
      }
    } else if (randomNumber < rareOdds) {
      let role = rare[Math.floor(Math.random() * rare.length)];
      let gold = 90;
      if (rareRoles.includes(role)) {
        if (activeTalisman == undefined) {
          message.channel.send(
            `You opened a lootbox and recieved the **rare** role, **${role}**! You already have this so instead, you will recieve **${gold} gold**!`
          );
          balance.add(`balance_${authorID}.gold`, gold);
        } else if (activeTalisman == "role") {
          randomRole(legendaryOdds, epicOdds, rareOdds, uncommonOdds);
        }
      } else {
        message.channel.send(
          `You opened a lootbox and recieved the **rare** role, **${role}**, it has been added to your collection!`
        );
        if (rareRoles.includes("none")) {
          collectables.delete(`collectables_${authorID}.roles.rare`);
        }
        collectables.push(`collectables_${authorID}.roles.rare`, role);
      }
    } else if (randomNumber < uncommonOdds) {
      let role = uncommon[Math.floor(Math.random() * uncommon.length)];
      let gold = 50;
      if (uncommonRoles.includes(role)) {
        if (activeTalisman == undefined) {
          message.channel.send(
            `You opened a lootbox and recieved the **uncommon** role, **${role}**! You already have this so instead, you will recieve **${gold} gold**!`
          );
          balance.add(`balance_${authorID}.gold`, gold);
        } else if (activeTalisman == "role") {
          randomRole(legendaryOdds, epicOdds, rareOdds, uncommonOdds);
        }
      } else {
        message.channel.send(
          `You opened a lootbox and recieved the **uncommon** role, **${role}**, it has been added to your collection!`
        );
        if (uncommonRoles.includes("none")) {
          collectables.delete(`collectables_${authorID}.roles.uncommon`);
        }
        collectables.push(`collectables_${authorID}.roles.uncommon`, role);
      }
    } else {
      let role = common[Math.floor(Math.random() * common.length)];
      let gold = 30;
      if (commonRoles.includes(role)) {
        if (activeTalisman == undefined) {
          message.channel.send(
            `You opened a lootbox and recieved the **common** role, **${role}**! You already have this so instead, you will recieve **${gold} gold**!`
          );
          balance.add(`balance_${authorID}.gold`, gold);
        } else if (activeTalisman == "role") {
          randomRole(legendaryOdds, epicOdds, rareOdds, uncommonOdds);
        }
      } else {
        message.channel.send(
          `You opened a lootbox and recieved the **common** role, **${role}**, it has been added to your collection!`
        );
        if (commonRoles.includes("none")) {
          collectables.delete(`collectables_${authorID}.roles.common`);
        }
        collectables.push(`collectables_${authorID}.roles.common`, role);
      }
    }
  }

  function randomGold(min, max) {
    let gold = Math.floor(Math.random() * (max - min)) + min;
    message.channel.send(`You opened a lootbox and recieved **${gold} gold**!`);
    balance.add(`balance_${authorID}.gold`, gold);
  }

  function randomRoses(min, max) {
    let roses = Math.floor(Math.random() * (max - min)) + min;
    if (roses == 1) {
      message.channel.send(
        `You opened a lootbox and recieved **${roses} rose**!`
      );
    } else {
      message.channel.send(
        `You opened a lootbox and recieved **${roses} roses**!`
      );
    }
    inventory.add(`inventory_${authorID}.roses`, roses);
  }

  function randomGems(min, max) {
    let gems = Math.floor(Math.random() * (max - min)) + min;
    if (gems == 1) {
      message.channel.send(
        `You opened a lootbox and recieved **${gems} gem**!`
      );
    } else {
      message.channel.send(
        `You opened a lootbox and recieved **${gems} gems**!`
      );
    }
    balance.add(`balance_${authorID}.gems`, gems);
  }

  /*function randomTalisman(roleOdds) {
    let ramdomNumber = Math.floor(Math.random() * 100);
    if (randomNumber < roleOdds) {
      message.channel.send(
        `You opened a lootbox and recieved **${gems} gem**!`
      );
    }
  }*/

  let lootbox = inventory.get(`inventory_${authorID}.lootboxes.gold`);
  let roselootbox = inventory.get(`inventory_${authorID}.lootboxes.rose`);
  let gemlootbox = inventory.get(`inventory_${authorID}.lootboxes.gem`);

  // lootbox
  if (item == "lootbox" || item === "lb") {
    if (lootbox > 0) {
      let activeTalisman = inventory.get(
        `inventory_${authorID}.talismans.active`
      );
      if (activeTalisman == undefined) {
        inventory.subtract(`inventory_${authorID}.lootboxes.gold`, 1);

        let randomItem = Math.floor(Math.random() * 100);

        if (randomItem < 40) {
          randomGold(80, 120);
        } else if (randomItem < 70) {
          randomRoses(3, 5);
        } else {
          if (
            commonRoles.length < 18 ||
            uncommonRoles.length < 13 ||
            rareRoles.length < 10 ||
            epicRoles.length < 7 ||
            legendaryRoles.length < 3
          ) {
            randomRole(3, 13, 33, 63);
          } else {
            let randomNumber = Math.floor(Math.random() * 100);

            if (randomNumber < 50) {
              randomGold(70, 140);
            } else if (randomNumber < 99) {
              randomRoses(3, 6);
            } else {
              randomGems(1, 1);
            }
          }
        }
      } else if (activeTalisman == "role") {
        inventory.subtract(`inventory_${authorID}.lootboxes.gold`, 1);
        inventory.delete(`inventory_${authorID}.talismans.active`);

        if (
          commonRoles.length < 18 ||
          uncommonRoles.length < 13 ||
          rareRoles.length < 10 ||
          epicRoles.length < 7 ||
          legendaryRoles.length < 3
        ) {
          randomRole(3, 13, 33, 63);
        } else {
          let gold = 25;
          message.channel.send(
            `You opened a lootbox and recieved a collectable role! Although you already have all the collectable roles so instead, you will be given back your **lootbox** and **25 gold** for your role talisman!`
          );
          balance.add(`balance_${authorID}.gold`, gold);
          inventory.add(`inventory_${authorID}.lootboxes.gold`, 1);
        }
      }
    } else {
      message.channel.send(
        `You don't have any lootboxes to open, you can buy one from the shop!`
      );
    }

    // crimson lootbox
  } else if (item == "crimson" || item === "c") {
    if (args[1] && args[1].toLowerCase() == "lootbox" || item === "lb") {
      if (roselootbox > 0) {
        let activeTalisman = inventory.get(
          `inventory_${authorID}.talismans.active`
        );
        if (activeTalisman == undefined) {
          inventory.subtract(`inventory_${authorID}.lootboxes.rose`, 1);

          let randomItem = Math.floor(Math.random() * 100);

          if (randomItem < 40) {
            randomGold(230, 310, "crimson lootbox");
          } else if (randomItem < 70) {
            randomRoses(8, 15, "crimson lootbox");
          } else if (randomItem < 99) {
            if (
              commonRoles.length < 18 ||
              uncommonRoles.length < 13 ||
              rareRoles.length < 10 ||
              epicRoles.length < 7 ||
              legendaryRoles.length < 3
            ) {
              randomRole(10, 30, 60, 80, "crimson lootbox");
            } else {
              let randomNumber = Math.floor(Math.random() * 100);

              if (randomNumber < 50) {
                randomGold(230, 310, "crimson lootbox");
              } else if (randomNumber < 99) {
                randomRoses(8, 15, "crimson lootbox");
              } else {
                randomGems(1, 1, "crimson lootbox");
              }
            }
          } else {
            randomGems(1, 1);
          }
        } else if (activeTalisman == "role") {
          inventory.subtract(`inventory_${authorID}.lootboxes.rose`, 1);
          inventory.delete(`inventory_${authorID}.talismans.active`);

          if (
            commonRoles.length < 18 ||
            uncommonRoles.length < 13 ||
            rareRoles.length < 10 ||
            epicRoles.length < 7 ||
            legendaryRoles.length < 3
          ) {
            randomRole(10, 30, 60, 80, "crimson lootbox");
          } else {
            let gold = 25;
            message.channel.send(
              `You opened a lootbox and recieved a collectable role! Although you already have all the collectable roles so instead, you will be given back your **lootbox** and **25 gold** for your role talisman!`
            );
            balance.add(`balance_${authorID}.gold`, gold);
            inventory.add(`inventory_${authorID}.lootboxes.rose`, 1);
          }
        }
      } else {
        message.channel.send(
          `You don't have any lootboxes to open, you can buy one from the shop!`
        );
      }
    } else {
      message.channel.send(
        `${args.join(
          " "
        )} is not a valid item, use \`${prefix}inventory\` to view what you can use!`
      );
    }

    // lapidary lootbox
  } else if (item == "lapidary" || item === "l") {
    if (args[1] && args[1].toLowerCase() == "lootbox" || item === "lb") {
      if (gemlootbox > 0) {
        let activeTalisman = inventory.get(
          `inventory_${authorID}.talismans.active`
        );
        if (activeTalisman == undefined) {
          inventory.subtract(`inventory_${authorID}.lootboxes.gem`, 1);

          let randomItem = Math.floor(Math.random() * 100);

          if (randomItem < 50) {
            randomGold(440, 500, "lapidary lootbox");
          } else if (randomItem < 75) {
            randomRoses(18, 25, "lapidary lootbox");
          } else if (randomItem < 99) {
            if (
              commonRoles.length < 18 ||
              uncommonRoles.length < 13 ||
              rareRoles.length < 10 ||
              epicRoles.length < 7 ||
              legendaryRoles.length < 3
            ) {
              randomRole(30, 60, 80, 90, "lapidary lootbox");
            } else {
              let randomNumber = Math.floor(Math.random() * 100);

              if (randomNumber < 50) {
                randomGold(440, 500, "lapidary lootbox");
              } else if (randomNumber < 99) {
                randomRoses(8, 15, "crimson lootbox");
              } else {
                randomGems(1, 1, "lapidary lootbox");
              }
            }
          } else {
            randomGems(1, 1, "lapidary lootbox");
          }
        } else if (activeTalisman == "role") {
          inventory.subtract(`inventory_${authorID}.lootboxes.gem`, 1);
          inventory.delete(`inventory_${authorID}.talismans.active`);

          if (
            commonRoles.length < 18 ||
            uncommonRoles.length < 13 ||
            rareRoles.length < 10 ||
            epicRoles.length < 7 ||
            legendaryRoles.length < 3
          ) {
            randomRole(3, 13, 33, 63);
            inventory.delete(`inventory_${authorID}.talismans.active`);
          } else {
            let gold = 25;
            message.channel.send(
              `You opened a lootbox and recieved a collectable role! Although you already have all the collectable roles so instead, you will be given back your **lootbox** and **25 gold** for your role talisman!`
            );
            balance.add(`balance_${authorID}.gold`, gold);
            inventory.add(`inventory_${authorID}.lootboxes.gem`, 1);
          }
        }
      } else {
        message.channel.send(
          `You don't have any lootboxes to open, you can buy one from the shop!`
        );
      }
    } else {
      message.channel.send(
        `${args.join(
          " "
        )} is not a valid item, use \`${prefix}inventory\` to view what you can use!`
      );
    }

    // rose
  } else if (item == "rose") {
    let senderID = message.author.id;
    let senderRoses = inventory.get(`inventory_${senderID}.roses`);
    if (senderRoses > 0) {
      if (message.mentions.users.first()) {
        if (message.mentions.users.first() != senderID) {
          let reciever = message.mentions.users.first();
          let recieverID = message.mentions.users.first().id;

          balance.add(`balance_${recieverID}.roses`, 1);
          inventory.subtract(`inventory_${senderID}.roses`, 1);
          message.channel.send(
            `You have successfully sent a rose to ${reciever.username}!`
          );
        } else {
          message.channel.send(`You cannot give yourself a rose!`);
        }
      } else {
        message.channel.send(
          `You must mention the user you want to give the rose to!`
        );
      }
    } else {
      message.channel.send(`You dont have an roses to give away!`);
    }

    // role talisman
  } else if (item == "role") {
    if (args[1] && args[1].toLowerCase() == "talisman") {
      let talismans = inventory.get(`inventory_${authorID}.talismans.role`);
      if (talismans > 0) {
        let activeTalisman = inventory.get(`inventory_${authorID}.talismans.active`);
        if (activeTalisman == undefined) {
          inventory.push(`inventory_${authorID}.talismans.active`, "role");
          inventory.subtract(`inventory_${authorID}.talismans.role`, 1);
          message.channel.send(
            `You have successfully used a role talisman, the next lootbox you open is guaranteed to contain a collectable role!`
          );
        } else {
          message.channel.send(`You already have a talisman active!`);
        }
      } else {
        message.channel.send(
          `You don't have any role talisman to use, you can buy one from the shop!`
        );
      }
    } else {
      message.channel.send(
        `${args.join(
          " "
        )} is not a valid item, use \`${prefix}inventory\` to view what you can use!`
      );
    }
  } else {
    message.channel.send(
      `${args.join(
        " "
      )} is not a valid item, use \`${prefix}inventory\` to view what you can use!`
    );
  }
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ["u"],
  args: true
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "use",
  description: "Use an item from your inventory.",
  usage: "<item>",
  example: "lootbox"
};
