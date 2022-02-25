const Discord = require('discord.js');

module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop!',
    usage: 'e!buy [item]',
    /**
     * 
     * @param {Discord.Message} message 
     */
    run: async(client, message, args, cs) => {
        let thing = args[0];
        if (!thing) return message.reply('Please provide item number')
        if (isNaN(thing)) return message.reply('Please provide valid item number')
        let result = await cs.buy({
            user: message.author,
            guild: message.guild,
            item: parseInt(thing)
        });
        if (result.error) {
            if (result.type === 'No-Item') return message.reply('Please provide valid item number');
            if (result.type === 'Invalid-Item') return message.reply('item does not exists');
            if (result.type === 'low-money') return message.reply(`**You don't have enough balance to buy this item!**`);
        } else return message.reply(`**Successfully bought  \`${result.inventory.name}\` for $${result.inventory.price}**`)

    }
}