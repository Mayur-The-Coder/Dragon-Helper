const { Client, Message, MessageEmbed } = require('discord.js');
const cd = new Set();
module.exports = {
    name: 'work',
    description: 'Yet another way to earn',
    usage: 'e!work',
    aliases: ['wk'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, cs) => {
        if(cd.has(message.author.id)) {
            message.reply(`You have worked recently.\nTake a break!`)
        } else {
            let workas = ["Fishermen", "Craftsmen", "Gamer", "Lumberjack"];
            let ws = Math.floor(Math.random() * workas.length);
            let money = Math.floor(Math.random() * 10000) + 1000;
            let t = `wallet`;
            cs.addMoney({
                guild: message.guild,
                user: message.author, 
                wheretoPutMoney: t,
                amount: money
            });
            message.channel.send(`${message.author.username} worked as a ${workas[ws]}\nYou put a lot of effort,\nThe owner of the place got happy and gave you ${client.config.EMOJI}**${money}**!`)
        }
        cd.add(message.author.id);
        setTimeout(() => {
            cd.delete(message.author.id)
            message.channel.send(`<@${message.author.id}> \`e!work\`is ready!`)
        }, 300000);
    }
}