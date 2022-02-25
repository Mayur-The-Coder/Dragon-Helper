const { Client, Message, MessageEmbed } = require('discord.js');
const enchantList = ["normie", "good", "great", "mega", "epic", "hyper", "ultimate", "perfect", "edgy", "ultra-edgy", "omega", "ultra-omega", "godly"];
const EenchantList = [":sparkles: ~-~> **normie** <~-~ :sparkles:", ":sparkles: ~-~> **good** <~-~ :sparkles:", ":sparkles: ~-~> **mega** <~-~ :sparkles:"
,":sparkles: ~-~> **epic** <~-~ :sparkles:", ":sparkles: ~-~> **hyper** <~-~ :sparkles:", ":sparkles: ~-~> **ultimate** <~-~ :sparkles:", ":sparkles: ~-~> **perfect** <~-~ :sparkles:",
":sparkles: ~-~> **edgy** <~-~ :sparkles:", ":sparkles: ~-~> **ultra-edgy** <~-~ :sparkles:", ":sparkles: ~-~> **omega** <~-~ :sparkles:", ":sparkles: ~-~> **ultra-omega** <~-~ :sparkles:", ":sparkles: ~-~> **godly** <~-~ :sparkles:"];

module.exports = {
    name: 'enchant',
    description: 'Mutes you when you get your desired enchantment!',
    usage: 'e!enchant [enchant]',
    aliases: ['em', "e"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const enchantment = args[0];
        if(!enchantment) return message.reply(`Cannot mute you when you haven't provided a valid enchantment.`);
        let en = enchantment.toLowerCase();
        if(!enchantList.includes(en)) return message.reply(`Provided enchantment isn't valid!\n**${en}**`)
        const filter = m => m.author.id === "555955826880413696";
        const collector = message.channel.createMessageCollector({ filter, max: 75, time: 1000 * 60 * 30});
        message.channel.send(`You will be muted when you get the enchantment **${enchantment}**`);
        let got = false;

        collector.on('collect', async(msg) => {
            let Embed = msg.embeds[0];
            if(!Embed) return;
            if(Embed.author.name.includes(message.author.id)) {
            let enchantm = Embed.fields[0].name.toLowerCase();
            console.log(enchantm);
            for (let i = 0; i < EenchantList.length; i++) {
                if(EenchantList[i] >= enchantm) {
                    console.log(`Correct enchant!`)
                }
            }
        }   
    });
    collector.on('end', collect => {
        if(got) return;
        if(got == false) message.channel.send(`Time is up!\nRun this command again:\n\`e!e ${enchantment}\``)
    });
  }
}