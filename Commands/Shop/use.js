const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'use',
    description: 'Use an item brought from the store!',
    usage: 'e!use [item]',
    /**
     * 
     * @param {Discord.Message} message 
     */
    run: async(client, message, args, cs) => {
        const target = await message.guild.members.fetch({
            user: message.author.id,
            force: true
        })
        const item = args[0];
        if (!item) return message.reply("What item you wana use?")
        if (parseInt(item)) return message.reply("Please use the name of the item, not the ID.")
        let haveItem = false;
        const arr = await cs.getUserItems({
            user: message.author,
            guild: message.guild,
        });
        let i;
        for (key in arr.inventory) {
            if (arr.inventory[key].name.toLowerCase().includes(item.toLowerCase())) haveItem = true;
            i = key;
        };
        if (haveItem) { 
            switch (item.toLowerCase()) {
                case "clan": {
                    if(message.member.roles.cache.has("946660962742706217")) return message.reply(`You already can claim a channel head to: <#942397731991859242>`);
                    await message.member.roles.add("946660962742706217");
                    message.channel.send(`You have used the item **${item}**\nYou have 24hrs to claim your clan!\nHead to <#942397731991859242>`);
                    const hrs = ms(`24hrs`);
                    setTimeout(() => {
                        message.member.roles.remove("946660962742706217")
                    }, hrs);
                }
                break;
            }
                cs.removeUserItem({
                    user: message.author,
                    guild: message.guild,
                    item: i+1
                })
        } else return message.reply("Please buy the item first!")
    }
}