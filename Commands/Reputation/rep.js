const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');
const repDB = require("../../Database/Models/repdb");
const cd = new Set();

module.exports = {
    name: 'reputation',
    description: 'Give a member reputation!',
    usage: 'e!rep @member',
    aliases: ['rep'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(cd.has(message.author.id)) {
            message.reply(`You have given a reputation point to someone in the last 2hrs please wait!`)
        } else {
        const member = message.mentions.users.first();
        if(!member) return message.reply(`Missing mention!\nCorrect usage: \`e!rep [@member]\``);
        if(member.id == message.author.id) return message.reply(`You cannot repute yourself!`)
        if(member.bot) return message.reply(`You cannot repute a bot!`)
        const repData = await repDB.findOne({ guildId: message.guild.id, userId: member.id});
        if(!repData) {
            repDB.create({ guildId: message.guild.id, userId: member.id, Rep: 1})
            message.channel.send(`<@${message.author.id}> gave a rep to <@${member.id}>\nRep: 1`)
        } else {
            repData.Rep += 1;
            repData.save();
            message.channel.send(`<@${message.author.id}> gave a rep to <@${member.id}>\nRep: ${repData.Rep}`)
        }
      }
      const hour = ms(`2hrs`)
      cd.add(message.author.id);
      setTimeout(() => {
          cd.delete(message.author.id)
      }, hour);  
    }
}