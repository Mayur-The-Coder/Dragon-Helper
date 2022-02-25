const joinMinibossList = require('../../Functions/Mininboss/joinMinibossList.js');
const leaveMinibossList = require('../../Functions/Mininboss/leaveMinibossList.js');
const startMinibossList = require('../../Functions/Mininboss/startMinibossList.js');
const client = require('../../index.js');
const { MINIBOSSBOOSTED, MINIBOSSCHANNELID } = require('../../listid.json');
let playerList = [];
let levelList = [];

client.on("messageCreate", async(message) => {
    if(message.channel.id !== "894577170616295504") return;
    if(message.author.bot) return;
    if(isNaN(message.content)) return message.delete();
    const Level = parseInt(message.content);
    if(Level > 49999 || Level < 0) return  message.delete();
    if(playerList.includes(message.author.id)) return message.delete();
    const MBmsg = await message.channel.messages.fetch("944217101193850900", { force: true, cache: true});
    const EmbedMB = MBmsg.embeds[0];
    joinMinibossList(client, message, playerList, levelList, Level)

    if(playerList.length == '10' && levelList.length == '10') {
        startMinibossList(client, message, playerList, levelList, MBmsg, EmbedMB)
    }
});

client.on('interactionCreate', async(interaction) => {
    if(!interaction.isButton) return;
    if(interaction.customId == 'yeet') {
        leaveMinibossList(client, interaction, playerList, levelList)
    }
})