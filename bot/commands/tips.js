// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const db = require("quick.db");

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");
const colour = require("../settings/colours.json");

// DEFINE DATABASES ----------------------------\\
const settings = new db.table("settings");

// DEFINE COMMAND ------------------------------\\
const tipsEmbed = new Discord.MessageEmbed()
  .setTitle("Pick A Category")
  .setDescription(
    "React with the corresponding emoji to select a category.\n:regional_indicator_v: - Village (Page 1)\n🆚 - Village (Page 2)\n:regional_indicator_w: - Werewolves\n:regional_indicator_s: - Solo"
  )
  .setFooter(
    "If there are no reactions added within 30 seconds, command will be canceled."
  )
  .setTimestamp()
  .setColor(colour.yellow);

const villageTips = new Discord.MessageEmbed()
  .setTitle("Village Tips 1")
  .addField(
    "Aura Seer",
    "Always pay attention to the remaining Unknown roles left in the game. Do not ignore this and lynch good unknowns or potential fools.\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Bodyguard",
    "Known for following the seer around, the bodyguard defends against werewolves twice before dying. In a zombie game, bodyguards usually recoil out of fear so that they can be bitten, but because you only die on your second attack I am pretty sure you can still keep the seer alive. In quick games, be on either the seer or the doctor if he revealed his role. The doctor should not reveal his role but there is a chance that players will.\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Beast Hunter",
    "Changing your trap during the game is not a good move. My highest recomendation is either set it on yourself or in a very powerful role like gunner (with bullets), seer, jailer... This way you may save somene's live and get a werewolf kill, or make a random killer not kill.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Coupled",
    "Don't ever make it obvious that you are coupled, and protect the Cupid if you can. As an informer, you can trick everyone else that your lover is good (if they are bad). Protect your lover at all costs, you will die with your lover too!\n*By Washi_Green#9514 on Discord*"
  )
  .addField(
    "Cupid",
    "Help your couple in your first place. However, if your couple is surely going to lose, try to help the village. Do not forget that you can also win with the village.\n*By Zoiezoie07#6199 on Discord*"
  )
  .addField(
    "Detective",
    "Pay attention to who claims and who doesn't during the day. Check two people who haven't claimed anything yet. This forces them to claim something and moves the game along smoother.\n*By MashiWashi#4909 on Discord*"
  )
  .addField(
    "Fortune Teller",
    "Don't give both of your cards out on the first night. Instead, give one card to a random player on the first night, and save the second card for giving it to someone who is suspicious or haven't claimed anything yet. This avoids strong villagers being killed due to being forced to reveal and can also help village to find out evil or solo roles.\n*By Kachikawawa#5130 on Discord*"
  )
  .addField(
    "Preist and Marksman",
    "your job can be either to kill or to CONFIRM good players. For example: if there are two players who are counter claiming, watering or shooting one of them could be the best option. In the worst case, you will die but will find an enemy, so it's worth it.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Protecting Roles",
    "Try to guess who is a seer/an aura seer so that you can protect them. But be careful, sometimes you will meet the wolf seer pretending they are one of the types of seers. If it's hard and you don't have enough information, just protect other useful roles (Gunner, Medium etc.).\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Flower Child",
    "You have to protect the people from all of those random voters. You can save a victory from fool or Headhunter with your ability, and that is very useful.\n*By Aljninja#5731 on Discord*"
  )
  .setFooter(
    `Submit your own tips & tricks in the Werewolf Companion support server, get a link to it using the ${prefix}support command.\nReact with ⬅️ to return to the main tips page.`
  )
  .setTimestamp()
  .setColor(colour.yellow);

const villageTips2 = new Discord.MessageEmbed()
  .setTitle("Village Tips 2")
  .addField(
    "Grumpy Grandma",
    "don't always mute someone. You are useful if you mute a werewolf, a fool, a random killer.... but useless if you mute a villager. Sometimes, not muting is the best option.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Gunner",
    "Put down that gun. It is dangerous. No, do not go to that village and shoot random people. Shooting random people might cause the seer's death. In fact, it is reportable if villagers are the victims. When someone shouts that they are bad, do not trust them, nor shoot them as they are highly likely the fool. It does not really work the same way someone claims fool, but if the village starts lynching him you can shoot to find out if you suspect him of being the fool. Finally, before the werewolves howl, get the jailer to jail you for protection.\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Jailer",
    "One of the best roles that can't really kill werewolves, but can protect anyone except himself. Like a doctor, just that he role blocks and kills as well. At the start of the game, if you do survive each night, jail the gunner until he uses his second bullet. After his second bullet, start jailing suspicious people. If the junior werewolf is confirmed, jail the junior werewolf and only kill it when it is the last werewolf. Remember to reveal yourself to the gunner so that he can vouch for you if you are getting lynched. If it is a cursed game, you can jail the cursed as well so that he will not become a werewolf, although there is a chance he is already a werewolf. You can stop jailing him when there is one werewolf (besides him) remaining, unless there are only 3 villagers (including him) remaining.\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Loudmouth and Avenger",
    "You are only useful when dying, so feel free to make werewolves or random killers kill you. Or even villagers. But NEVER ask village to lynch you. They may accuse you of being fool, or you could be Headhunter objective. And as Avenger, you don't always have to kill when dying. You may kill a villager.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Mayor",
    "As a mayor, your double votes are important late into the game. The whole thing turns into a mind game of revealing or not. If you don't reveal the village might lynch you, yet if you reveal you might get killed late game and lose. Most of the time revealing early is the best option, and remember to use your double votes to create ties if you suspect they are the fool or turn the tide against the werewolves.\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Medium",
    "Pay attention to the roles left in the game while reviving. Sometimes, reviving the gunner might be smart, sometimes reviving the seer might be the best, but not always. If the protecting roles are all dead, revive one of them unless they are offline.\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Red Lady",
    "There are two lessons:\n1: Don't visit day 1, as you may die and you won't be able to tell info unless medium is alive\n2: Don't feel forced to visit. You can visit, yes, but you can stay in your home during a night. Werewolves don't usually attack Red lady, so don't be scared.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Sheriff",
    "Sheriff is a good role. I don't know why people says the contrary. As sheriff, try to predict who may die. Gunner and secondary informers, as well as jailer, are common objectives among werewolves. PRO TIP: Sheriff counters the vast majory of solos, but especially bomber, as there are a lot of players who will die for it.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Seer",
    "Check people who don't talk much (or not at all) and who are not revealed. They often (not always, of course) are werewolves (or the solo role) who don't dare to talk much. But when you find someone who is good, do not reveal their role (med, jailer, gunner, mayor etc.) Werewolves might target them.\n*By u/Akakill on Reddit*"
  )
  .addField(
    "Tough Guy",
    "Avoid protecting night one and claim day one. This way you avoid a possible counterclaim of the player who attacked you. And do not be afraid of dying, its your job after all.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Witch",
    "Witch is a role with an amazing potential of adding pressure to the werewolves, as she can avoid a whole attack as well as killing someone. However, there are 2 things to have in mind:\n1: She only can kill and save once, so use the potions wisely.\n2: She can't protect herself, so a doctor protecting her can be very useful.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Villager",
    "When you get the Villager role as a Random Regular Villager, you can claim as Beast Hunter, or another Regular Villager role. The werewolves might be scared of attacking you. If they do attack you, they would have wasted an attack.\n*By Aljninja#5731 on Discord*"
  )
  .setFooter(
    `Submit your own tips & tricks in the Werewolf Companion support server, get a link to it using the ${prefix}support command.\nReact with ⬅️ to return to the main tips page.`
  )
  .setTimestamp()
  .setColor(colour.yellow);

const werewolvesTips = new Discord.MessageEmbed()
  .setTitle("Werewolf Tips")
  .addField(
    "Alpha Werewolf",
    "As Alpha Werewolf your vote counts double at night. Try to make the right decisions by voting for the most important roles.Also be aware that they might be protected of course.If someone is asking your role, claim a role that fits your unknown aura.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .addField(
    "Guardian Wolf",
    "The standart is save a werewolf. However, you can use your ability to save a random killer or even a villager. The random killer, to give him time to kill villagers. The villager, to make villager suspect him.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Junior Werewolf",
    "Don't be afraid to die as this role. This role's main goal is to damage the village in a bigger way than any other wolf. To achieve this you could fake something that completely causes chaos. Like a spirit seer saying two unprovable villagers are red. This ends in your death eventually but like said before, don't be scared to die.\n*By MashiWashi#4909 on Discord*"
  )
  .addField(
    "Kitten Wolf",
    "Always convert someone before dying. Even if it's random. If you have a Kitten werewolf on your team and he gets found without converting, protect it at all cost. Even if Kitten dies, they will have another infiltrated wolf between them."
  )
  .addField(
    "Nightmare Werewolf",
    "Nightmaring the informers is not the only way to go. You can effectively nightmare any role with a night ability. Medium, jailer, marksman, all of these could possibly deal more damage than nightmaring the seer. In late game you can even nightmare the solo killer to get an upperhand.\n*By MashiWashi#4909 on Discord*"
  )
  .addField(
    "Sorcerer",
    "Try faking seer. It's very effective in the majory of cases, because you are unconfirmable except if another seer checks you. Also have in mind that Priest's watering can't kill you, and that's all you need. The only con is that if you are the last werewolf, village automatically wins.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Wolf Seer",
    "If your wolf seer happens to check the serial killer in an early game, don't get him killed yet. He is needed to take out the villagers and stabilize the number of people that's still alive. This is also to ensure that the village does not have sufficient time to find you and your teammates, thus increasing your chances of winning.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .addField(
    "Wolf Shaman",
    "Do not forget to shaman unconfirmed players. The investigators are very likely to check them. If your target is checked, and they die eventually, others will start to suspect the investigator. Your job is done at that time. Last but not least, be aware of Fools and Headhunters' targets. If you shaman them, and unfortunately they are checked, it might lead to a failure!\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Werewolf",
    "If there are very few people left, try your best to achieve a tie in the number of villagers to werewolves. Then try to kill the easiest target, not the one who is the more 'powerful one' - trying the latter just gets you killed.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .setFooter(
    `Submit your own tips & tricks in the Werewolf Companion support server, get a link to it using the ${prefix}support command.\nReact with ⬅️ to return to the main tips page.`
  )
  .setTimestamp()
  .setColor(colour.yellow);

const soloTips = new Discord.MessageEmbed()
  .setTitle("Solo Tips")
  .addField(
    "Arsonist",
    "Douse 2 players per night. Same as for the serial killer. Try to find the most important roles. You can either choose to burn people after every 2 nights, or douse as many people as you can and burn them at the end, at the risk that you may be killed before that.You choose your strategy.It's not easy to win with the arsonist, but you may have luck sometimes.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .addField(
    "Bomber",
    "Same as the arsonist. You can either place bombs on a lot of players and explode them at the end(with the risk that you can die before) or place a bomb on someone and then explode him. It's your decision.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .addField(
    "Fool",
    "Try to stay silent(don't tell anything, just vote) in the first 3-4 days, maybe more. The village suspects the silent people that are online pretty much every time. Sometimes it may not work, sometimes it may give you a win. Another strategy is to play like a normal villager, like you are in their team, until someone asks you your role. Then, you just say a claimed role or a role that didn't die, and this will probably result in your death and your win.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .addField(
    "Headhunter",
    "Have patience. Your target can be lynched any moment of the game. Just wait until there is being a role call, wait for your objective to claim, counter claim and... BOOM! Lynch. Or you can ask its role and counter claim, equally valid.\n*By Aljninja#5731 on Discord*"
  )
  .addField(
    "Sect Leader",
    "It is very important to put in the sect the seer and aura seer. If they find you as sect leader while they are still in the village team, it will be a fail for you.If you find and put them in the sect, it would be a lot easier for you to win.If you don't have any info about seer/aura seer, just put in the sect the people that are a danger for you (gunner, jailer etc.). If you don't have info about anyone, just put in the sect a random person.If your sect is big, it will be easier for your team to win.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .addField(
    "Serial Killer",
    "You have 2 choices. Either stay silent and try to see who is the seer, aura seer, gunner etc. (important roles), or be an actor and play like a normal villager, so that the village won't suspect you. In daytime, try to find the most important roles, so you can kill them at night. If you don't find anything, just kill a random person.Try to keep the village busy trying to find the werewolves, so that they won't even notice there is a serial killer in the game.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .addField(
    "Zombie",
    "It is pretty easy to win with the zombie. Just bite a random player on the first night and wait until they become a zombie.Then, you can just bite the most important roles that may affect you(seer, gunner etc.) until the number of zombies is higher than the number of villagers.If you arrive here, your team will likely win.\n*By the WWO TIps & Tricks Discord Server*"
  )
  .setFooter(
    `Submit your own tips & tricks in the Werewolf Companion support server, get a link to it using the ${prefix}support command.\nReact with ⬅️ to return to the main tips page.`
  )
  .setTimestamp()
  .setColor(colour.yellow);

// RUN COMMAND ---------------------------------\\
exports.run = (client, message, args) => {
  function tipsFun() {
    message.channel.send(tipsEmbed).then(sentEmbed => {
      sentEmbed.react("🇻");
      sentEmbed.react("🆚");
      sentEmbed.react("🇼");
      sentEmbed.react("🇸");

      let filter = (reaction, user) => {
        return (
          ["🇻", "🆚", "🇼", "🇸"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      function removeReactions() {
        sentEmbed.reactions.removeAll();
      }

      sentEmbed
        .awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] })
        .then(collected => {
          const reaction = collected.first();

          function backFun(cat) {
            removeReactions();
            sentEmbed.edit(cat).then(sentEmbed => {
              sentEmbed.react("⬅️");

              let filter = (reaction, user) => {
                return (
                  ["⬅️"].includes(reaction.emoji.name) &&
                  user.id === message.author.id
                );
              };

              sentEmbed
                .awaitReactions(filter, {
                  max: 1,
                  time: 120000,
                  errors: ["time"]
                })
                .then(collected => {
                  let reaction = collected.first();

                  function tipsFun2() {
                    removeReactions();
                    sentEmbed.edit(tipsEmbed).then(sentEmbed => {
                      sentEmbed.react("🇻");
                      sentEmbed.react("🆚");
                      sentEmbed.react("🇼");
                      sentEmbed.react("🇸");

                      let filter = (reaction, user) => {
                        return (
                          ["🇻", "🆚", "🇼", "🇸"].includes(
                            reaction.emoji.name
                          ) && user.id === message.author.id
                        );
                      };

                      sentEmbed
                        .awaitReactions(filter, {
                          max: 1,
                          time: 30000,
                          errors: ["time"]
                        })
                        .then(collected => {
                          let reaction = collected.first();

                          if (reaction.emoji.name === "🇻") {
                            backFun(villageTips);
                          } else if (reaction.emoji.name === "🆚") {
                            backFun(villageTips2);
                          } else if (reaction.emoji.name === "🇼") {
                            backFun(werewolvesTips);
                          } else if (reaction.emoji.name === "🇸") {
                            backFun(soloTips);
                          }
                        })
                        .catch(collected => {
                          message.channel.send(
                            `No reaction added in time, command has been canceled!`
                          );
                          removeReactions();
                        });
                    });
                  }

                  if (reaction.emoji.name === "⬅️") {
                    removeReactions();
                    tipsFun2();
                  }
                })
                .catch(collected => {
                  removeReactions();
                });
            });
          }
          ("🆚");

          if (reaction.emoji.name === "🇻") {
            backFun(villageTips);
          } else if (reaction.emoji.name === "🆚") {
            backFun(villageTips2);
          } else if (reaction.emoji.name === "🇼") {
            backFun(werewolvesTips);
          } else if (reaction.emoji.name === "🇸") {
            backFun(soloTips);
          }
        })
        .catch(collected => {
          message.channel.send(
            `No reaction added in time, command has been canceled!`
          );
          removeReactions();
        });
    });
  }

  tipsFun();
};

// COMMAND CONFIG ------------------------------\\
exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["MANAGE_MESSAGES", "ADD_REACTIONS", "EMBED_LINKS"],
  aliases: ["tips", "t"]
};

// COMMAND HELP --------------------------------\\
exports.help = {
  name: "tips",
  description:
    "Tips & tricks submitted by other Werewolf Online players. Submit your own in the support server, get a link with the .support command."
};
