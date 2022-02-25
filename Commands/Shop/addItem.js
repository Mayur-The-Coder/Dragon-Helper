module.exports = {
    name: 'additem',
    description: 'Add an item to the shop!',
    usage: 'e!additem [name] [price] [description]',
    userPerms: ['ADMINISTRATOR'],
    aliases: ['ai', 'addi', 'aitem'],
    run: async(client, message, args, cs) => {
        if (args[1] < 1) return message.reply("You can't add an item for less than 1$!");
        if(isNaN(args[1])) return message.reply('Okay alphabet for price. Respect')
        let result = await cs.addItem({
            guild: message.guild,
            inventory: {
                name: args[0],
                price: args[1],
                description: args.slice(2).join(' ') || 'No Description'
            }
        });
        if (result.error) {
            if (result.type == 'No-Inventory-Name') return message.reply('There was a error, Please enter item name to add.!')
            if (result.type == 'Invalid-Inventory-Price') return message.reply('There was a error, invalid price!')
            if (result.type == 'No-Inventory-Price') return message.reply('There was a error, You didnt specify price!')
            if (result.type == 'No-Inventory') return message.reply('There was a error, No data recieved!')
        } else return message.reply('Done! Successfully added `' + args[0] + '` to the shop!')
    }
}