const client = require('../../index.js')
const Discord = require('discord.js')
let thi = ["942351540042215484", "894598105515835453", "894580350217502760", "894577170616295504", "942397731991859242"];

client.on("messageDelete", async(message) => {
    if(message.author.bot) return;
    if(message.author.id == client.config.OWNERID) return;
    if(thi.includes(message.channel.id)) return;
    const msgContent = message.content;
    if(msgContent.length > 1024) msgContent.slice(0, 1021) + "...";
    

    const Embed = new Discord.MessageEmbed()
    .setAuthor({ name: `Sent by ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true})})
    .setThumbnail(message.author.avatarURL({ dynamic: true}))
    .setDescription(`Message Details Below`)
    .addFields(
        {
            name: 'Message Content',
            value: `${msgContent}`
        },
        {
            name: 'Message Channel',
            value: `${message.channel}`
        },
        {
            name: "User",
            value: `NAME: ${message.author.tag}, ID: ${message.author.id}`
        }
    )
    let atch
    if(message.attachments >= 1) {
        atch = message.attachments[0]
    }
    Embed.setImage(atch)
    message.guild.channels.cache.get("932528396301377607").send({ embeds: [Embed]})

})