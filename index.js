const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

const client = new Client({ disableEveryone: true });
const botconfig = require('./botconfig.json');
const { Database } = require("quickmongo");
const db = new Database(botconfig.MONGO); // mongodb url
const quickdb = require("quick.db");

require('events').EventEmitter.defaultMaxListeners = 0
client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./Commands Folder/');

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});


/* -------------------------------------------\*
|                                             |
|                                             |
|           Your code below here              |
|                                             |
|                                             |
/* ------------------------------------------*\
/*/

























/* -------------------------------------------\*
|                                             |
|                                             |
|           Your code above here              |
|                                             |
|                                             |
/* ------------------------------------------*\
/*/

client.mongoose.init();
client.login(botconfig.TOKEN); //Client Token