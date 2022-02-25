const Discord = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'Leaderboard of the server!',
    aliases: ['lb'],
    usage: 'e!leaderboard',
    run: async(client, message, args, cs) => {
        let data = await cs.leaderboard(message.guild.id);
        if (data.length < 1) return message.reply("Nobody's in leaderboard yet.");
        const msg = new Discord.MessageEmbed();
        let pos = 0;
        // This is to get First 10 Users )
        data.slice(0, 10).map(e => {
            if (!client.users.cache.get(e.userID)) return;
            pos++
            msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **${e.wallet}** - Bank: **${e.bank}**`, false);
        });
    
        message.reply({
            embeds: [msg]
        }).catch();
    }
}