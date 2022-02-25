const { MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs')

module.exports = {
    name: 'help',
    aliases: ['h'],
    userPerms: ['SEND_MESSAGES'],
    clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
    description: "Shows all available bot commands.",
    run: async(client, message, args) => {
        if(!args[0]) {
            const embed = new MessageEmbed();
            readdirSync("./Commands/").forEach((dir) => {
                const commands = readdirSync(`./Commands/${dir}/`).filter((file) => file.endsWith(".js"))
            
            const cmds = commands.map((command) => {
                let file = require(`../../Commands/${dir}/${command}`)
                if(!file.name) return "No command name.";

                let name = file.name.replace(".js", "");

                return `\`${name}\``;
            });
            embed.addField(`${dir.toUpperCase()}`, `${cmds.join(" | ")}`)
            })

            embed.setTitle("Commands")
            .setDescription(`Use \`e!help\` followed by a command name to get more additional information on a command. for example: \`e!help ping\``)
            .setColor("RANDOM")
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            return message.channel.send({ embeds: [embed] })
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            if(!command) {
                const embed = new MessageEmbed()
                .setTitle('Not Found')
                .setDescription(`Command not found, Use \`e!help\` for all commands available`)
                .setColor("RANDOM");
                return message.channel.send({ embeds: [embed]})
            }
            const embed = new MessageEmbed()
            .setTitle("Command Details")
            .addField("COMMAND:",
            command.name ? `\`${command.name}\`` : "No name for this command"
            )
            .addField("ALIASES:",
            command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command."
            )
            .addField("USAGE:",
            command.usage ? `\`e!${command.name} ${command.usage}\`` : `\`e!${command.name}\``
            )
            .addField("DESCRIPTION", command.description ? command.description : "No description for this command."
            )
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            .setColor("RANDOM");
            return message.channel.send({ embeds: [embed]});
        }
    }
}
// https://sourceb.in/jxiqrdbDSZ