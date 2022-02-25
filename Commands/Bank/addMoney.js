const Discord = require('discord.js');

module.exports = {
    name: 'addmoney',
    description: 'Add money to a user!',
    usage: 'e!addmoney [money]',
    userPerms: ['ADMINISTRATOR'],
    aliases: ['adm', 'am', 'atm'],
    /**
     * 
     * @param {Discord.Message} message 
     */
    run: async(client, message, args, cs) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      //  if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("You do not have requied permissions.")
        if(!user) return message.reply(`You want me to send money to who?\n||The God?||`)
        let wheretoPutMoney = args[1];
        if (!wheretoPutMoney) wheretoPutMoney = 'bank';
        else wheretoPutMoney = 'wallet';
        let amount = args.slice(2).join(' ')
        let money = parseInt(amount);
        let result = await cs.addMoney({
            user: user,
            guild: message.guild,
            amount: money,
            wheretoPutMoney: wheretoPutMoney
        });
        if (result.error) return message.reply("You cant add negative money");
        else message.reply(`Successfully added $${money} to ${user.user.username}, ( in ${wheretoPutMoney} )`)
    }
}