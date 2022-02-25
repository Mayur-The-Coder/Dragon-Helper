const client = require('../../index.js');
const { MessageEmbed } = require('discord.js')


client.on("messageCreate", async(message) => {
    if(message.channel.id != "894575998690004993") return;
    const { content, member, author } = message;
    const tt01role = message.guild.roles.cache.get("893088223365058601");
    const tt2role = message.guild.roles.cache.get("893088173360574525")
    // const tt01role = message.guild.roles.fetch("893088223365058601", { cache: true, force: true});
    // const tt2role = message.guild.roles.fetch("893088173360574525", { cache: true, force: true})
    if(content.toLowerCase() == "rpg p" || content.toLowerCase() == "rpg profile") {
        const filter = m => m.author.id === "555955826880413696";
        const collector = message.channel.createMessageCollector({
            filter,
            max: 1
        });
        collector.on('collect', async(msg) => {
            let Embed = msg.embeds[0];
            if(msg.embeds.length == 0) return message.reply(`Sorry I couldn't find your rpg profile!`)
            let tt = Embed.fields[0].value.toLowerCase().split(/\r?\n/)[3];
            if(Embed.author.name.includes(author.username)) {
                if(tt == undefined || tt === `**time travels**: 1`) {
                if(member.roles.cache.has(tt01role)) return message.reply(`Your roles were already managed no changes were required!`);
                member.roles.add(tt01role)
                message.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle(`Your roles have been updated`)
                    .setColor("BLURPLE")
                    .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL({ dynamic: true})})
                    .setDescription(`You have been assigned the roles ${tt01role}\nYou now have access to the boosted lists`)
                ]})
                } else {
                    if(member.roles.cache.has(tt2role)) return message.reply(`You already have the tt2+ roles you do no need any more changes!`);
                    member.roles.add(tt2role) 
                    message.reply({ embeds: [
                        new MessageEmbed()
                        .setTitle(`Your roles have been updated`)
                        .setColor("WHITE")
                        .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL({ dynamic: true})})
                        .setDescription(`You have been assigned the roles ${tt2role}\nYou now have access to the boosted lists`)
                    ]})
                }
            } else {
                return;
            }
        })
    }
});