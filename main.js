/**
 * @module Main
 * @description Handles application procedures
 * @version 1.0.0
 * @author nullptr
 */

require('dotenv').config();

const Eris = require('eris');
const Bot = new Eris(process.env.TOKEN);

Bot.on('messageCreate', async (Msg) => {
    if (Msg.channel.id === process.env.HONEYPOTID) {
        const Guild = Bot.guilds.get(Msg.guildID);
        const Member = Guild?.members.get(Msg.author.id);

        await Msg.delete();

        if (Member) await Member.kick('Kicked from honeypot');
    }
});

Bot.on('ready', () => console.log(`Ready as: ${Bot.user.username}`));
Bot.on('error', (Error) => console.error(`${Error.message}`));

Bot.connect();