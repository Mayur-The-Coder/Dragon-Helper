const { MINIBOSSCHANNELID } = require('../../listid.json');

module.exports = async function startMinibossList(client, message, playerList, levelList, MBmsg, EmbedMB) {
    const roleformb = await message.guild.roles.cache.get("943844225403998260");
    const channelforboost = await message.guild.channels.cache.get(MINIBOSSCHANNELID);
    let levelm = levelList[0], levelmi = 0;
    let x = ``;
    let cmd = `rpg miniboss`;
    for (let i = 0; i < playerList.length; i++) {
        const memberforboost = await message.guild.members.fetch({
            user: playerList[i],
            force: true,
            cache: true
        });
        memberforboost.roles.add(roleformb);
        setTimeout(() => {
            memberforboost.roles.remove(roleformb)
        }, 360000);
        if(levelm < levelList[i]) {
            levelm = levelList[i]
            levelmi = i;
        }
    }
    channelforboost.send(`<@${playerList[levelmi]}> are the host with **L${levelList[levelmi]}**\nUse the following command: ||Your ID has been already removed!||`)
    playerList.splice(levelmi, 1)
    levelList.splice(levelmi, 1)
    for (let i = 0; i < playerList.length; i++) {
        cmd += ` <@${playerList[i]}>`
    }
    channelforboost.send(`\`${cmd}\``)
    playerList = []
    levelList = []
    EmbedMB.setDescription(`No players!`)
    EmbedMB.setTitle(`☠️ Miniboss List | ${playerList.length}/10`)
    EmbedMB.fields[0] = {name: `Recommended Host`, value: `No one!`}
    MBmsg.edit({ embeds: [EmbedMB]})
}   