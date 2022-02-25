module.exports = async function startArenaList(client , interaction, alist, embeda, roleforboost) {
    const channelforarena = client.channels.cache.get('938315516555190362');
    let adesc = ``;
    let cmd = `rpg arena`
    for (let i = 0; i < alist.length; i++) {
        adesc += `${i + 1}. <@${alist[i]}> [${alist[i]}]\n`;
        cmd += ` <@${alist[i]}>`
    const memberforarena = await interaction.guild.members.fetch({
            user: alist[i],
            force: true
        });
        memberforarena.roles.add(roleforboost)
        setTimeout(() => {
            memberforarena.roles.remove(roleforboost)
        }, 360000);             
    }
    alist = [];
    embeda.setDescription(`No Players!`)
    embeda.setTitle(`🍪 Arena List - ${alist.length}/10`)
    channelforarena.send(`${adesc}`)
    setTimeout(() => {
        channelforarena.send(`\`${cmd}\``)
    }, 2000);
    interaction.message.edit({ embeds: [embeda]})
}