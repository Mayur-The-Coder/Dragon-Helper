const Discord = require('discord.js')

module.exports = {
    name: 'inventory',
    description: 'Your inventory!',
    aliases: ['inv', 'i'],
    usage: 'e!inv',
    /**
     * 
     * @param {Discord.Message} message 
     * @returns 
     */
    run: async(client, message, args, cs) => {

        const user = message.mentions.members.first() || message.author;
        let result = await cs.getUserItems({
            user: user,
            guild: message.guild,
        });
        let inv = result.inventory.slice(0, 10)
        const embed = new Discord.MessageEmbed()
            .setDescription('Your Inventory in Empty!')
        for (key of inv) {
            embed.addField(`**${key.name}:**`, `Amount: ${key.amount}`);
            embed.setDescription('Your Inventory!')
    
        }
        return message.channel.send({
            embeds: [embed]
        })
    
    
    }
}