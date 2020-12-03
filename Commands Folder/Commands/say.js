const { MessageEmbed } = require('discord.js');
const botconfig = require('../../botconfig.json');
const Guild = require('../../models/guild');
module.exports = {
    name: 'Say',
    category: '2. Moderation ⭐',
    description: 'Bot repeats what you tell it to.',
    usage: `say`,
    aliases: ['Say', 'say'],
    run: async (client, message, args) => {
        //Get current guild Prefix
        const settings = await Guild.findOne({
            guildID: message.guild.id
        })
        const prefix = settings.prefix;


        message.delete()

        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('You do not have permission to use this command. (Manage_Messages)').then(m => m.delete({ timeout: 5000 }));
        }
        if (args.length < 1)
            return message.channel.send(`You must specify something for the bot to repeat!\n\`${prefix}Say <message>\`\n\`${prefix}Say embed <message>\``).then(m => m.delete({ timeout: 5000 }));

        if (args[0].toLowerCase() === 'embed') {
            const embed = new MessageEmbed()
                .setColor(botconfig.COLOR)
                .setDescription(args.slice(1).join(' '))

            message.channel.send(embed);
        } else {
            message.channel.send(`${args.slice().join(' ')}`)
        }
    }
}