const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout)

module.exports = {
    name: 'a10wood',
    aliases: ['w', 'a10w','wood'],
    description: 'Calculates the amount of A5 apples and A3 fish you require!!',
    usage: 'e!a10wood [wood]',
    run: async(client, message, args) => {
        const wood = args[0];
        if(!wood) return message.reply('Provide a valid amount of wood to calculate!!');
        if(isNaN(wood)) return message.reply(`Couldn\'t calculate ${fish} as it is not a number!`)

        if(wood > 1000000000) return message.reply(`<@${message.author.id}> Please enter a amount which is less than a billion!!`)

        let applec = `<:apple:928263294970634270>${parseInt(wood / 33.75)}` || "Couldn\'t Calculate the apples";
        let fishc = `<:fish:928263317737308230>${parseInt(wood / 33.75 * 2)}` || "Couldn\'t calculate the fish";

        const wembed = new MessageEmbed()
        .setTitle("Calculator")
        .addFields(
            {
                name: 'Wood',
                value: `<:wooden_log:928263333403049994>${wood}`
            },
            {
                name: 'Apple in A5',
                value: `${applec}`
            },
            {
                name: "Fish in A3",
                value: `${fishc}`
            }
        )
        .setColor("RANDOM")
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamin: true })});


            message.reply({ embeds: [wembed]}).then(msgs => {
                msgs.react("<:wooden_log:928263333403049994>")
            });
    }
}