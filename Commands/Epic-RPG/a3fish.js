const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'a3fish',
    aliases: ['a3f', 'fish'],
    description: 'Calculates the amount of A5 apple and A10 wood!!',
    usage: 'e!a3fish [fish]',
    run: async(client, message, args) => {
        const fish = args[0];
        if(!fish) return message.reply("Provide a valid amount of fish!");
        if(isNaN(fish)) return message.reply(`Couldn\'t calculate ${fish} as it is not a number!`)

        if(fish > 1000000000) return message.reply(`<@${message.author.id}> Please enter a amount which is less than a billion!!`)

        let capple = `<:apple:928263294970634270>${parseInt(fish / 2)}` || "Couldn't calculate the number of fish.";
        let cwood = `<:wooden_log:928263333403049994>${parseInt(fish / 2 * 33.75)}`;

        let embed = new MessageEmbed()
        .setTitle("Calculator")
        .setColor("RANDOM")
        .addFields(
            {
                name: 'A3 fish',
                value: `<:fish:928263317737308230>${fish}`
            },
            {
                name: 'A5 apple',
                value: `${capple}`,
                inline: true
            },
            {
                name: 'A10 wood',
                value: `${cwood}`,
                inline: true
            }
        )
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamin: true })});

        message.reply({ embeds: [embed]}).then(fmsg => {
            fmsg.react('<:fish:928263317737308230>')
        })
    }
};