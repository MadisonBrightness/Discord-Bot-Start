const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const { getMember } = require("../../functions.js");
const botconfig = require('../../botconfig.json');
module.exports = {
    name: 'Prefix',
    category: '1. Admin 🌟',
    description: 'Sets the prefix for this server.',
    usage: `prefix <newPrefix>`,
    aliases: [`prefix`],
    run: async (client, message, args) => {
        const member = getMember(message);
        message.delete();
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You do not have permission to use this command! (Manage_Guild)').then(m => m.delete({ timeout: 10000 }));
        };

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

                let join = new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription('This server was not in our database! We have added it, please retype this command.')
                return message.channel.send(join).then(m => m.delete({ timeout: 10000 }));
            }
        });

        if (args.length < 1) {
            let sprefix = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`You must specify a prefix to set for this server! Your current server prefix is \`${settings.prefix}\``)
            return message.channel.send(sprefix).then(m => m.delete({ timeout: 10000 }));
        };

        await settings.updateOne({
            prefix: args[0]
        });

        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
            .setDescription(`Your server prefix has been updated to \`${args[0]}\``)
            .setTimestamp()
        return message.channel.send(embed).then(m => m.delete({ timeout: 10000 }));
    }
}