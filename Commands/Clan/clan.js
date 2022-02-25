const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
let cmds = ["request", "create", "add", "kick", "delete", "info", "desc"];
const clanDB = require('../../Database/Models/clandb.js');

module.exports = {
    name: 'clan',
    description: 'Clan settings',
    usage: 'e!clan [type]',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const type = args[0];
        if(!type) return message.reply({ embeds: [new MessageEmbed().setTitle(`Clan`).setDescription(`Hey there ${message.author.username}.\nWhat command are you looking for?\n\`request\`, \`add\`, \`kick\`, \`delete\`, \`info\`, \`desc\`.`)]});
        if(!cmds.includes(type)) return message.reply(`Couldn't find command \`${type}\`!`);
        switch (type.toLowerCase()) {
            case "request": {
                if(!message.member.roles.cache.has(`893089216156794900`) || !message.member.roles.cache.has(`946660962742706217`)) return message.delete().then((x) => message.author.send(`You cannot yet claim a clan!`).catch((e) => {}))
                const clanData = await clanDB.findOne({ guildId: message.guild.id, ownerId: message.author.id});
                if(clanData) return message.delete().then(() => message.author.send(`You already own a clan!`));
                if(message.channel.id !== "942397731991859242") return message.reply(`You cannot request to claim a channel here!`)
                let member = message.mentions.users.first();
                if(!member) return message.delete().then(() => message.author.send(`You didn't mention another player other than you for your clan!`).catch((e) => {}));
                if(member.id == message.author.id)  return message.delete().then(() => message.author.send(`You didn't mention another player other than you for your clan!`).catch((e) => {}));
                if(member.bot) return message.delete().then(() => message.author.send(`Provided member is a bot!`).catch((e) => {}));
                let name = args.slice(2).join('-') || message.author.username;
                const Embed = new MessageEmbed()
                .setTitle(`New clan requested by ${message.author.username}`)
                .setDescription(`If clan approved use the following command!`)
                .addFields(
                    {
                        name: `Members`, 
                        value: `${message.author.username}, ${member.username}`
                    },
                    {
                        name: `Clan name`,
                        value: `${name}`
                    }
                )
                message.delete().then(() => message.author.send(`Your clan request has been sent to reviewing!\nOnce reviewed your clan will be created!`).catch((e) => {}))
                const Channel = message.guild.channels.cache.get("945944672189161483");
                    Channel.send({ embeds: [Embed]});
                    setTimeout(() => { Channel.send(`\`e!clan create 942395894848958504 ${message.author.id} ${member.id} ${name}\``) }, 5000);
            }
            break;
            case "create": {
                if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.delete().then(() => message.channel.send(`You cannot use this command!`));
                const parent = args[1];
                if(!parent || isNaN(parent)) return message.reply(`Couldn't find a category provided!`);
                const owner = args[2];
                if(!owner || isNaN(owner)) return message.reply(`Couldn't find a owner provided!`);
                const ownerM = message.guild.members.cache.get(owner);
                if(!ownerM) return message.reply(`Provided owner is not valid!`)
                const member = message.guild.members.cache.get(args[3])
                if(!member) return message.reply(`I couldn't find the memberID given!`);
                const Cname = args.slice(4).join("-")
                if(!Cname) return message.reply(`Please provide the channel name!`)
                message.guild.channels.create(`${Cname}`, {
                    parent: parent,
                    type: "GUILD_CHANNEL"
                }).then(async(channel) => {
                    channel.send(`Owner: <@${ownerM.id}>\nMembers: <@${member.id}>`).then((msg) => {
                        setTimeout(() => {
                            msg.pin()
                        }, 5000);
                    clanDB.create({ guildId: message.guild.id, ownerId: ownerM.id, messageId: msg.id, channelId: channel.id});
                    });
                    channel.send(`__**Rules:**__`).then((m) => {
                        channel.send(`-> An inactive clan (unused channel for more than 7 days without notice), will be deleted. If you want it back, you will need to reapply for one.\n-> You are not allowed to play in a squadron that isn't yours. If you do, you will get warned/muted depending on the number of occurrences.\n-> Minibosses and Arenas still have to be used in the right channel because of the ping. You can gamble/enchant/summon epic events in your squadron.\n-> The owner of the channel decides who's allowed in his/her channel.\n-> Most of the commands related to clan is mainly **OWNER** only.`)
                        setTimeout(() => {
                            m.pin()
                        }, 5000);
                    });
                    message.channel.send(`Channel created: <#${channel.id}>`)
                });
            }
            break;
            case "add": {
                const clanA = await clanDB.findOne({ guildId: message.guildId, channelId: message.channel.id});
                if(!clanA) return message.reply(`I couldn't find your clan!\nPlease open a ticket if you think this was bug!\nNote: You **cannot** add a member if you aren't the owner!`);
                if(message.author.id !== clanA.ownerId) return message.reply(`You cannot add a member because you aren't the owner of this clan!`)
                const addmember = message.mentions.users.first();
                if(!addmember) return message.reply(`You didn't mention a player to add!`);
                const Emsg = await message.channel.messages.fetch(clanA.messageId, { force: true, cache: true})
                if(!Emsg) return message.reply(`Didn't find your message!`);
                if(Emsg.mentions.has(addmember)) return message.reply(`User is already in your clan!`);
                if(Emsg.mentions.users.size >= 5) return message.reply(`Your clan already has more then 5 member!`)
                const filter = m => m.author.id === addmember.id;
                const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 1});
                message.channel.send(`<@${addmember.id}> are you willing to join this clan?\nReply with a \`yes\` or \`no\`.`)
                collector.on('collect', (msg) => {
                    if(msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "ye") {
                        Emsg.edit(Emsg.content + `<@${addmember.id}>`)
                        message.channel.send(`<@${addmember.id}> is now part of this clan!`)
                    } else if(msg.content.toLowerCase() == "no" || msg.content.toLowerCase() == 'n') {
                        message.reply(`User declined it!`)
                    } else {
                        return message.reply(`Didn't get an correct answer!`)
                    }
                });
                collector.on('end', collected => {
                    if(!collected) return message.reply(`User didn't reply on time!`);
                })
            }
            break;
            case "kick": {
                const clanT = await clanDB.findOne({ guildId: message.guildId, channelId: message.channel.id});
                if(!clanT) return message.reply(`I couldn't find your clan!\nPlease open a ticket if you think this was bug!\nNote: You **cannot** add a member if you aren't the owner!`)
                if(message.author.id !== clanT.ownerId) return message.reply(`You cannot use this command!`)
                const addmember = message.mentions.users.first();
                if(!addmember) return message.reply(`You didn't mention a player to add!`);
                const Emsg = await message.channel.messages.fetch(clanT.messageId, { force: true, cache: true})
                if(!Emsg) return message.reply(`Didn't find your message!`);
                if(!Emsg.mentions.has(addmember)) return message.reply(`User is not in your clan!`);
                Emsg.mentions.users.delete(addmember);
                Emsg.mentions.users.filter(me => me.id !== addmember.id)
               // console.log(Emsg.content)
                Emsg.edit(Emsg.content.replace(`<@${addmember.id}>`, ``))
                message.channel.send(`${addmember.username} has been kicked!`)
            }
            break;
            case "delete": {
                const clanD = await clanDB.findOne({ guildId: message.guildId, ownerId: message.author.id, channelId: message.channel.id});
                if(!clanD) return message.reply(`I couldn't find your clan!\nPlease open a ticket if this is a bug!`);
                if(clanD) {
                    if(message.channel.id !== clanD.channelId) return message.reply(`This is not your channel!`);
                    if(message.author.id !== clanD.ownerId) return message.reply(`You cannot use this command!`)
                    message.channel.send({ content: `<@${message.author.id}> are you sure?\nReply with \`yes\` to accept and \`no\` to stop!`});
                    const filter = m => m.author.id === message.author.id;
                    const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 1});
                    collector.on("collect", msg => {
                        if(msg.content.toLowerCase() == "yes" || msg.content.toLowerCase() == "y" || msg.content.toLowerCase() == "ye") {
                            message.channel.delete()
                            message.author.send(`Your clan has been deleted!`)
                            clanD.delete();
                        } else if(msg.content.toLowerCase() == "no" || msg.content.toLowerCase() == 'n') {
                            message.reply(`You have declined it.\nContinue playing!`)
                        } else {
                            return message.reply(`Didn't get an correct answer!`)
                        }
                    });
                    collector.on('end', collected => {
                        if(!collected) return message.reply(`You didn't give an answer`);
                    });
                }
            }
            break;
            case "info": {
                let memberinfo = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
                if(!memberinfo) return message.reply(`Couldn't find member you provided!`)
                const clanA = await clanDB.findOne({ guildId: message.guild.id, ownerId: memberinfo.id});
                if(!clanA) return message.reply(`User doesn't own a clan!`);
                const msg = await message.channel.messages.fetch(clanA.messageId, { force: true, cache: true})
                let members = msg.content.toLowerCase().split(/\r?\n/)[1]
                const Embed = new MessageEmbed()
                .setTitle(`${memberinfo.username}'s clan`)
                .addFields(
                    {
                        name: `Clan Name`,
                        value: `<#${clanA.channelId}>`
                    },
                    {
                        name: `Owner:`,
                        value: `<@${clanA.ownerId}>`
                    },
                    {
                        name: `Members:`,
                        value: `${members.replace(`members:`, ``)}`
                    }
                )
                .setColor("RANDOM")
                .setThumbnail(memberinfo.avatarURL({ dynamic: true}));
                message.channel.send({ embeds: [Embed]})
            }
            break;
            case "desc": {
                const CLANDATA = clanDB.findOne({ guildId: message.guildId, ownerId: message.author.id, channelId: message.channel.id});
                if(!CLANDATA) return message.reply(`Didn't find your clan!\nReport if this is a bug\nAlso this is **Clan Owner** only command!`);
                let desc = args.slice(1).join(' ');
                message.channel.setTopic(desc)
                message.channel.send(`Topic has been set to: **${desc}**`)
            }
        }
    }
}