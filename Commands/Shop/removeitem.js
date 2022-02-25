const Discord = require('discord.js');

module.exports = {
    name: 'removeitem',
    aliases: ['ri', 'removei'],
    description: 'Remove an item',
    userPerms: ['ADMINISTRATOR'],
    usage: 'e!inventory',
    run: async(client, message, args, cs) => {
        let id = args[0]
        if (!id) return message.reply('You wanna remove air??')
        let result = await cs.removeItem({
            guild: message.guild,
            item: parseInt(id)
        });
        if (result.error) {
            if (result.type == 'Invalid-Item-Number') return message.reply('There was a error, Please enter item number to remove.!')
            if (result.type == 'Unknown-Item') return message.reply('There was a error, The Item Does not exist!')
        } else message.reply('Done! Successfully removed the `' + result.inventory.name + '` from shop!')
    
    
    }
}