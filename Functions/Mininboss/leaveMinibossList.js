module.exports = async function leaveMinibossList(client, interaction, playerList, levelList) {
    if(playerList.includes(interaction.user.id)) {
        let d = ``;
        let e = `None`;
       let mlevel = levelList[0], imlevel = 0;
        for (let i = 0; i < playerList.length; i++) {
            if(playerList[i] == interaction.user.id) {
                let rmlevel = i;
                playerList.splice(rmlevel, 1)
                levelList.splice(rmlevel, 1)
            }
        }
        for (let i = 0; i < playerList.length; i++) {
            if(playerList.length != "0") d += `\`[${i + 1}]\` <@${playerList[i]}> **L${levelList[i]}**`
            if(mlevel < levelList[i]) {
                mlevel = levelList[i]
                imlevel = i
            }
           
            if(playerList.length != "0") e = `<@${playerList[imlevel]}> **L${levelList[imlevel]}**`
        }
        const embedMB = interaction.message.embeds[0];
        embedMB.fields[0] = {name: `Recommended Host`, value: `${e}`}
        embedMB.setDescription(`${d}`)
        embedMB.setTitle(`☠️ Miniboss List | ${playerList.length}/10`)
        interaction.message.edit({ embeds: [embedMB]})
        interaction.reply({ content: `You have left the list!\n`, ephemeral: true})
    } else {
        interaction.reply({ content: `You aren't in the list!`, ephemeral: true});
    }
}