const { MessageEmbed, GuildMember } = require('discord.js');
const client = require('../../index.js');

client.on('guildMemberRemove', (member) => {
    if(member.user.bot) return;
    const vc = member.guild.channels.cache.get("943820675657924639");
    let spylogger = client.channels.cache.get('932529028559142922')

    const embedsecret = new MessageEmbed()
    .setTitle("A MEMBER LEFT OUR SERVER :(")
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
    setTimeout(() => {
        vc.setName(`🐲Dragon: `+ member.guild.members.cache.filter(m => !m.user.bot).size)
    }, 5000);

    spylogger.send({ embeds: [embedsecret]})
});