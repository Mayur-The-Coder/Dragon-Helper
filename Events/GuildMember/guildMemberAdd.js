const { MessageEmbed, GuildMember } = require('discord.js');
const client = require('../../index.js');

client.on('guildMemberAdd', (member) => {
    const vc = member.guild.channels.cache.get("943820675657924639");

    if(member.user.bot) return;
    let channel = client.channels.cache.get('893430743924084776')
    let spylogger = client.channels.cache.get('932529028559142922')
    const embedwelcome = new MessageEmbed()
    .setTitle("A NEW CLAN MEMBER!!")
    .setDescription(`Welcome <@${member.id}> to Epic-RPG Clan\nHead to <#893433184648327198> for verifying!!\n**Member Count: ${member.guild.members.cache.filter(mb => !mb.user.bot).size}**\nHave a pleasent stay!`)
    .setThumbnail(member.displayAvatarURL({ dynamic: true}))
    .setColor("RANDOM")

    channel.send({ embeds: [embedwelcome], content: `<@${member.id}>`});
    setTimeout(() => {
        vc.setName(`🐲Dragon: `+ member.guild.members.cache.filter(m => !m.user.bot).size)
    }, 5000);

    const embedsecret = new MessageEmbed()
    .setTitle("A NEW MEMBER IN OUR SERVER.")
    .addFields(
        {
            name: 'User Details',
            value: `Name: ${member.displayName}\nID: ${member.id}`
        },
        {
            name: 'User Timings',
            value: `User joined at: <t:${parseInt(member.joinedAt / 1000)}:R>\nAccount created at: <t:${parseInt(member.user.createdAt / 1000)}:R>`
        }
    )
    .setColor('#5865F2')

    spylogger.send({ embeds: [embedsecret]})
});