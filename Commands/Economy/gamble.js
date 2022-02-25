const Discord = require('discord.js');

module.exports = {
    name: 'gamble',
    description: 'Are you sure about that?',
    usage: 'e!gamble [money] \*hehe\*',
    aliases: ['gb'],
    /**
     * @param {Discord.Message} message 
     */
    run: async(client, message, args, cs) => {
        let w = false;
        let color = ["RED", "GREEN", "YELLOW"];
        let c = Math.floor(Math.random() * color.length)
        let win = Math.floor(Math.random() * 100) + 1;
        let money = args[0];
        if(!money) return message.reply(`Provide and amount to gamble!`)
        if (isNaN(money)) return message.reply("Amount is not a number.");
        let result = await cs.balance({ user: message.author, guild: message.guild});
        if(money > result.wallet) return message.reply(`You do not have that much money to gamble!`);
        if(win > 60) w = true;
        let orw = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("bruh")
            .setLabel("Yes")
            .setStyle("SUCCESS")
        ).addComponents(
            new Discord.MessageButton()
            .setCustomId("brain")
            .setLabel("No")
            .setStyle("DANGER")
        )
        const msg = await message.channel.send({ content: `<@${message.author.id}> are you sure you wanna gamble!\nYou only have 40% chance of winning!`, components: [orw]});
        const filter = i => i.user.id == message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 30000, max: 1 });
        collector.on("collect", async(i) => {
            if(i.customId == "bruh") {
                if(w) {
                    let Embed = new Discord.MessageEmbed()
                    .setTitle("GAMBLING?")
                    .setDescription(`${message.author.username} you gambled ${client.config.EMOJI}${money} and won against your opponent!`)
                    .setColor(color[c])
                    .setThumbnail(message.author.avatarURL({ dynamic: true}));
                    await cs.addMoney({ user: message.author, guild: message.guild, wheretoPutMoney: "wallet", amount: money});
                    i.update({ content: `You choose to gamble *sigh*`, embeds: [Embed], components: []});
                } else {
                    let loseEmbed = new Discord.MessageEmbed()
                    .setTitle("GAMBLING?")
                    .setDescription(`${message.author.username} you gambled ${client.config.EMOJI}${money} and lost against your opponent!`)
                    .setColor(color[c])
                    .setThumbnail(message.author.avatarURL({ dynamic: true}));
                    await cs.removeMoney({ 
                        user: message.author,
                        guild: message.guild,
                        wheretoPutMoney: "wallet",
                        amount: money
                    })
                    // message.channel.send({ embeds: [loseEmbed]});
                    i.update({ content: `You choose to gamble *sigh*`, embeds: [loseEmbed], components: []});
                }
            } else if(i.customId == "brain") {
                i.update({ content: `Good choice <@${message.author.id}>`, components: []})
            }
        });
        collector.on('end', collected => {
            if(!collected) msg.edit(`You have not given me a choice but to cancel!`)
            else return;
        })

    }
}