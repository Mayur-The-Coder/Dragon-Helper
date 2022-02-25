const { MessageEmbed } = require('discord.js');
const client = require('../../index.js')

client.on("messageUpdate", async(oldMessage, newMessage) => {
    if(oldMessage.content == newMessage.content) return;
    if(oldMessage.author.bot) return;
    const oldMsgContent = oldMessage.content || "None"
    const newMsgContent = newMessage.content || "None"
    if(oldMsgContent.length > 1024) oldMsgContent.slice(0, 1021) + "..."
    if(newMsgContent.length > 1024) newMsgContent.slice(0, 1021) + "..."

    const Embed = new MessageEmbed()
    .setTitle(`Message editted by ${newMessage.author.tag}`)
    .setURL(newMessage.url)
    .setThumbnail(newMessage.author.avatarURL({ dynamic: true}))
    .addFields(
        {
            name: "Old Message",
            value: `${oldMessage.content}`
        },
        {
            name: "New Message",
            value: `${newMessage.content}`
        }
    )
    .setFooter({ text: `${newMessage.author.tag}`, iconURL: newMessage.author.avatarURL({ dynamic: true})})

    newMessage.guild.channels.cache.get('932826678005227600').send({ embeds: [Embed]})
})