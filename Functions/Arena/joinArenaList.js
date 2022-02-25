module.exports = async function joinArenaList(client, interaction, alist, embeda) {
    if(!alist.includes(interaction.user.id)) {
        alist.push(interaction.user.id)
    } else {
        interaction.reply({ content: `<@${interaction.user.id}> you are already in the list!`, ephemeral: true})
    }
    let desc = ``;
    for (let i = 0; i < alist.length; i++) {
        desc += `\`[${i + 1}]\` <@${alist[i]}>\n`            
    }
    embeda.setDescription(`${desc}`)
    embeda.setTitle(`🍪 Arena List - ${alist.length}/10`)
    embeda.setThumbnail(interaction.guild.iconURL({ dynamic: true}))
    embeda.setColor("WHITE")
    interaction.message.edit({ embeds: [embeda]});
    interaction.reply({ content: `<@${interaction.user.id}> you have joined the 🍪 arena-list\n ${alist.length}/10`, ephemeral: true});
}