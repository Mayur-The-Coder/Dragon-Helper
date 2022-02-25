const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    description: 'Enter your suggestion!!',
    usage: 'e!suggest [suggestion]',
    run: async(client, message, args) => {
        const suggest = args.slice(0).join(' ')
        if(!suggest) return message.delete();
        if(message.channel.id !== "894598105515835453") return message.reply("You cannot use this command in this channel!");


        let suggestlogger = client.channels.cache.get("894598374249099274");

        const sembed = new MessageEmbed()
        .setTitle("Suggestion")
        .setDescription(`${suggest}`)
        .setColor("NOT_QUITE_BLACK")
        .setFooter({ text: `Suggested by ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true })});
        message.delete().then((x) => message.author.send(`Your suggesting has been sent!`))

        suggestlogger.send({ embeds: [sembed]}).then(ml => {
            ml.react('👍')
            ml.react('👎')
        })


    }
}