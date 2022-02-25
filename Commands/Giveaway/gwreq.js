const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'gwreq',
    description: 'Setup a giveaway ping a requirements',
    usage: 'e!gwreq',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const tt = args[0];
        if(!tt) return message.reply(`Hey there please use any one of the following.\n\`1(tt0-1)\`, \`2(tt2-19)\`, \`3(tt20+)\``)
        const host = message.guild.members.cache.get(args[1]);
        if(!host) return message.reply(`Couldn't find host please check again!`)
        const requirement = args.slice(2).join(' ');
        if(!requirement) return message.reply(`No requirement provided. Please provide one!`);
       const channelg = await message.guild.channels.cache.get("942395147101020180");
       if(!channelg) throw new Error("Channel is invalid!");
       let t;
       switch (tt) {
           case "1": {
            t = `893088223365058601`
           }
           break;
           case "2": {
               t = `893088173360574525`
           }
           break;
           case "3": {
               t = `893088412150673409`
           }
           default : {
               message.reply(`Invalid ${tt}`)
           }
       }
       channelg.send(`🎉 Giveaway by: ${host}\n🔰 Must have role: <@&${t}>\n─── ··☆·· ───\n☑️ Requirements: ${requirement}`)

    }
}