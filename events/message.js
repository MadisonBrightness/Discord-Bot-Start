const mongoose = require('mongoose');
const Guild = require('../models/guild');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const botconfig = require('../botconfig.json');
const { Database } = require("quickmongo");
const quickdb = require("quick.db")
const db = new Database(botconfig.MONGO);
const { color, Color } = botconfig.COLOR;
module.exports = async (client, message) => {
  if (message.author.bot) return;

  const settings = await Guild.findOne({
    guildID: message.guild.id
  }, (err, guild) => {
    if (err) console.error(err)
    if (!guild) {
      const newGuild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id,
        guildName: message.guild.name,
        prefix: botconfig.PREFIX
      })

      newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

      return;
    }
  });

  const prefix = settings.prefix || process.env.PREFIX;


  if (message.content === `<@!777988521011970078>` || message.content === `<@777988521011970078>`) {
    return message.channel.send(new Discord.MessageEmbed()
      .setColor(color)
      .setDescription('*Getting Prefix...*')).then(message => message.delete({ timeout: 2000 })).then(() => {
        message.channel.send(
          new Discord.MessageEmbed()
            .setDescription(`The Guild Prefix is \`${prefix}\`...`)
            .setColor(color)
        )
      });
  };

  if (!message.guild) return;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command)
    command.run(client, message, args);

  /* -------------------------------------------\*
  |                                             |
  |                                             |
  |          Code below here if want            |
  |                                             |
  |                                             |
  /* ------------------------------------------*\
/*///                                           \\\*\















};