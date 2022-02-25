const Discord = require('discord.js');
const ms = require('ms');
let arraytt = ['TT0-1', 'TT2-19', 'TT20+']

module.exports = {
    name: 'giveaway',
    description: 'Host A giveaway!',
    usage: 'e!giveaway [time], [winners], [amount], [time-travel], [(optional) requirement]',
    aliases: ['gw'],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.channel.id !== "894580350217502760") return message.reply(`You cannot use this command in the channel!`)
        const channelforlogging = client.channels.cache.get("942629893584338984");
        const time = args[0];
        if(!time) return message.delete().then(() => { message.author.send(`You have not given the time for the giveaway!`).catch((e) => {})});
        const timeinms = ms(time);
        if(!timeinms) return message.delete().then(() => { message.author.send(`You have not given an valid time!`)})
        const winners = args[1];
        if(!winners || isNaN(winners) || winners < 1 || winners > 100) return message.delete().then(() => { message.author.send(`You have not given the winners or winners is invalid for the giveaway!`).catch((e) => {})});
        const amount = args[2];
        if(!amount) return message.delete().then(() => { message.author.send(`You have not given the amount for the giveaway!`).catch((e) => {})});
        const timetravel = args[3];
        if(!timetravel) return message.delete().then(() => {
            message.author.send(`You didn't mention the proper time travel for the giveaway!`)
        });
        const req = args.slice(4).join(' ') || "No requirement!";
        const Embed = new Discord.MessageEmbed()
        .setTitle(`New Giveaway by ${message.author.tag}`)
        .addFields(
            {name: "TIME", value: `${time}`},
            {name: "WINNERS", value: `${winners}`},
            {name: "AMOUNT", value: `${amount}`},
            {name: "REQUIREMENT", value: `${req}`}
        )
        .setDescription(`Use the command sent below:\nLegend: 1: tt0-1\n2: tt2-19\n3: tt20+`)
        .setColor("RANDOM");
        let e;
        switch (timetravel.toLowerCase()) {
            case "tt0-1": {
                e = `1`
            }
            break;
            case "tt2-19": {
                e = `2`
            }
            break;
            case "tt20+": {
                e = `3`
            }
            break;
        }


            message.delete();
            message.author.send(`Your giveaway has been sent to the GA managers!\nPlease wait until the review it and then host it!`)
            Embed.addField("TIME-TRAVEL", `${timetravel}`)
            channelforlogging.send({ embeds: [Embed], content: `<@&893087985409597460>`});
            channelforlogging.send(`\`g.create using template ${timetravel.toUpperCase()} --host <@${message.author.id}> -d ${time} -n ${amount} by ${message.author.tag} -w ${winners}\``)
            channelforlogging.send(`\`e!gwreq ${e} ${message.author.id} ${req}\``)

        
    }
}
