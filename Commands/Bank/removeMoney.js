const Discord = require('discord.js');

module.exports = {
    name: 'removemoney',
    description: 'Remove money from a user!',
    aliases: ['sue', 'rmoney'],
    userPerms: ['ADMINISTRATOR'],
    /**
     * @param {Discord.Message} message
     */
    run: async(client, message, args, cs) => {
        const user = message.mentions.members.first()
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("You do not have requied permissions.")
        if(!user) return message.reply(`Who do wanna sue?`);
        let wheretoPutMoney = args[1];
        if (!wheretoPutMoney) wheretoPutMoney = 'bank';
        else wheretoPutMoney = 'wallet';
        let amount = args.slice(2).join(' ');
        let money = parseInt(amount);
        let result = await cs.removeMoney({
            user: user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.reply("You cant remove negative money");
        else message.reply(`Successfully removed $${money} to ${user.user.username}, ( from ${wheretoPutMoney} )`)
    }
}