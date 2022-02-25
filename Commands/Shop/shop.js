const Discord = require('discord.js')

module.exports = {
    name: 'shop',
    description: 'Shop for buying??',
    usage: 'e!shop',
    run: async(client, message, args, cs) => {
        let result = await cs.getShopItems({
            guild: message.guild
        });
        let inv = result.inventory;
        const embed = new Discord.MessageEmbed()
            .setDescription('Shop!')
            .setColor("RANDOM")
        for (let key in inv) {
            embed.addField(`${parseInt(key) + 1} - **${inv[key].name}:** for $${inv[key].price}`, 'Description: ' + inv[key].description)
        }
        message.reply({
            embeds: [embed]
        });
    }
}