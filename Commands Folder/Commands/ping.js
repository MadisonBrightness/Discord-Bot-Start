const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const botconfig = require('../../botconfig.json');
module.exports = {
    name: 'Ping',
    category: 'Commands',
    description: 'Test Commands.',
    usage: `Ping`,
    aliases: [`ping`],
    run: async (client, message, args) => {
        message.channel.send(
            new MessageEmbed()
                .setDescription('PONG!')
                .setColor(botconfig.COLOR)
        )
    }
}