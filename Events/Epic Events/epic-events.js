const client = require('../../index.js')
// Pings on Epic Events!
client.on("messageCreate", async(message) => {
    if(!message.author.bot) return;
   if(message.author.id !== client.config.ERPGID) return;
    if(message.embeds.length == 0) return;
    let EpicEmbed = message.embeds[0];
    if(!EpicEmbed) return;
    // console.log(EpicEmbed)
    let name = EpicEmbed.fields[0].name.toLowerCase();
    if(!name) return;
    //console.log(name)
    if(name.startsWith(`**it's raining coins`)) {
        message.channel.send(`<@&893091364940701707> **CATCH**!`)
    } else if(name.startsWith("**an epic tree has just")) {
        message.channel.send(`<@&893091295915020290> **CHOP**!`)
    } else if(name.startsWith(`a megalodon has spawned`)) {
        message.channel.send(`<@&893091167682592809> **FISH**!`)
    }
});