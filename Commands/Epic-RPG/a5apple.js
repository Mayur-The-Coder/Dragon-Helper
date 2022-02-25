const { MessageEmbed } = require("discord.js");
const cooldown = new Set();

module.exports = {
    name: 'a5apple',
    description: 'Calculates the amount of A10 wood you get a A3 fish required!!',
    usage: 'e!a5apple [apple]',
    aliases: ['apple', 'a5a', 'a'],
    run: async(client, message, args) => {
        const apple = args[0];
        if(!apple) return message.reply("Provide a valid amount of apples to calculate!!");
        if(isNaN(apple)) return message.reply(`Couldn\'t calculate ${fish} as it is not a number!`)

        if(apple > 1000000000) return message.reply(`<@${message.author.id}> Please enter a amount which is less than a billion!!`)

        let woodc = `<:wooden_log:928263333403049994>${parseInt(apple * 33.75)}` || "Couldn't calculate the amount of wood!";
        let fishc = `<:fish:928263317737308230>${parseInt(apple * 2)}` || "Couldn't calculate the amount of fish.";

        const aembed = new MessageEmbed()
        .setTitle("Calculator")
        .addFields(
            {
                name: 'A5 apple',
                value: `<:apple:928263294970634270>${apple}`
            },
            {
                name: 'A10 wood',
                value: `${woodc}`,
                inline: true
            },
            {
                name: 'A3 fish',
                value: `${fishc}`,
                inline: true
            }
        )
        .setColor("RANDOM")
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true })});


        message.reply({ embeds: [aembed]}).then(amsg => {
            amsg.react('<:apple:928263294970634270>')
        })
    }
}