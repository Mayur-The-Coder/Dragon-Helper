const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');

module.exports = {
        name: "botinfo",
        aliases: ['stats', 'aboutme', 'bi'],
        description: "Shows Bot Statistics",
        usage: 'e!botinfo',
        run: async (client, message, args) => {
        
        const d = moment.duration(message.client.uptime);
        let prefix = 'e!'
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          WS Ping   :: ${Math.round(message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
          Prefix    :: ${prefix}
       `;
    
        const embed = new MessageEmbed()
        .setTitle('Bot\'s Statistics')
        .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true})})
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
        message.channel.send({ embeds: [embed] });
     }
}