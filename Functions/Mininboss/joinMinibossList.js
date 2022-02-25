module.exports = async function joinMinibossList(client, message, playerList, levelList, Level) {
    playerList.push(message.author.id);
    levelList.push(Level);
    message.delete();
    // 944174437379477514
    const MBmsg = await message.channel.messages.fetch('944217101193850900', {
        cache: true,
        force: true
    });
    const EmbedMB = MBmsg.embeds[0];
    if(!MBmsg) throw new Error("No Message Found!");
    if(!EmbedMB) throw new Error("No embed found!");
    let desc = ``;
    let maxLevel = levelList[0], indexMaxLevel = 0;
    for (let i = 0; i < playerList.length; i++) {
        desc += `\`[${i + 1}]\` <@${playerList[i]}> **L${levelList[i]}**\n`;
        if(maxLevel < levelList[i]) {
            maxLevel = levelList[i]
            indexMaxLevel = i
        }
    }
    if(playerList.length != '0') EmbedMB.fields[0] = {name: 'Recommended Host', value: `<@${playerList[indexMaxLevel]}> **L${levelList[indexMaxLevel]}**`}
    EmbedMB.setDescription(`${desc}`)
    EmbedMB.setTitle(`☠️ Miniboss List | ${playerList.length}/10`)
    MBmsg.edit({ embeds: [EmbedMB]});
}