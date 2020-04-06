// server.js
// where your node app starts

// init project
const fs = require('fs');
//Discord bot
const Discord = require('discord.js');
const client = new Discord.Client();
const {
  Client,
  RichEmbed
} = require('discord.js');
const bot = new Discord.Client();
const authkey = "";
const discordconfig = JSON.parse(fs.readFileSync('./discordconf.json'));

bot.login(authkey);

////////Discord bot////////
//Discord bot bootup :)
bot.on("ready", () => {
  console.log(' -> Bot ready with ' + bot.users.size + ' users online!');
  bot.user.setActivity("Hatching dino's");

  bot.on('guildMemberAdd', member => {
    console.log("New user joined the server :) ")

  })

  bot.on('guildMemberRemove', member => {
    console.log("User left the server")
  })
});

//Discord command listener//

bot.on("message", async message => {
  var msg = message.content.toUpperCase();
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send({
    embed: {
      color: 0xff0000,
      description: `I am hatching dino's:japanese_goblin:`,
      title: "Rawr"
    }
  }).then(msg => {

    msg.react("👺")
  })
  if (message.content.indexOf(discordconfig.prefix) !== 0) return;

  const args = message.content.slice(discordconfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if (command === "test") {
    let botembed = new RichEmbed();
    botembed.setDescription("Rawrrrr:rhino: ")
    botembed.setColor(GetRandomColour())
    botembed.setThumbnail("img link")
    botembed.addField("Header", "subtext")
    botembed.setFooter("Version 1.0")
    message.author.send(botembed); //Send to DM.
    message.channel.send(botembed) //Send to channel where message is sent.

  }
    if (command === "clean") {
    message.channel.fetchMessages({ limit: 100 }).then(msg => {
      for (let i = 0; i < msg.array().length; i++) {
        msg.array()[i].delete();
      }
    });
  }


})

////////Extra Functions////////

function GetRandomColour() {
  var randomcolour = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
  return randomcolour;
}
