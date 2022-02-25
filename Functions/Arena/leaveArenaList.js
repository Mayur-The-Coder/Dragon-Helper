module.exports = async function leaveArenaList(client, interaction, alist, embeda) {
    for (let i = 0; i < alist.length; i++) {
        if(alist[i] == interaction.user.id) {
            alist.splice(i, 1)
        }            
    }
    let descr = ``;
    for (let i = 0; i < alist.length; i++) {
        descr += `\`[${i + 1}]\` <@${alist[i]}>\n`            
    }
    embeda.setDescription(`${descr}`)
    embeda.setTitle(`🍪 Arena List - ${alist.length}/10`)

    interaction.message.edit({ embeds: [embeda]})
    interaction.reply({ content: 'You left the list!', ephemeral: true})
    
}