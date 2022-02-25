const client = require('../../index.js');
let { MessageActionRow, MessageButton } = require('discord.js');
const { PARENTID, EVERYONEID, BOOSTEDROLEID } = require('../../listid.json');
const joinArenaList = require('../../Functions/Arena/joinArenaList');
const leaveArenaList = require('../../Functions/Arena/leaveArenaList');
const startArenaList = require('../../Functions/Arena/startArenaList');
let alist = [];
function arrayRemove(arr, value) {
 
    return arr.filter(function(geeks){
        return geeks != value;
    });
  
 };

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isButton) return;
    const No = Math.floor(Math.random() * 90000) + 10000;
    const roleforboost = interaction.guild.roles.cache.get(BOOSTEDROLEID)
    const member = await interaction.message.guild.members.fetch({
        user: interaction.user.id,
        force: true
    })
   // if(!interaction.isButton) return;
    const embeda = interaction.message.embeds[0];
    if(interaction.customId === 'join') {
        joinArenaList(client, interaction, alist, embeda)
        if(alist.length == '10') {
            startArenaList(client, interaction, alist, embeda, roleforboost)
        }
    }
    if(interaction.customId === 'verify') {
        if(member.roles.cache.has('893088639167385640')) return interaction.reply({ content: `You are already verified!`, ephemeral: true})
        if(!member.roles.cache.has('893088639167385640')) {
            member.roles.add('893088639167385640');
            interaction.reply({ content: `You have been verified!`, ephemeral: true})
        }
    }
    if(interaction.customId === 'exit') {
        leaveArenaList(client, interaction, alist, embeda)
    }

});

// let channelforarena = client.channels.cache.get('894576978403930113');