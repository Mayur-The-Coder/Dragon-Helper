const cd = new Set();

module.exports = {
    name: 'hunt',
    description: 'Hunt some titans!',
    usage: 'e!hunt',
    run: async(client, message, args, cs) => {
        if(cd.has(message.author.id)) {
            message.reply(`You have hunted recently!\nPlease wait until your cd is over!`)
        } else {
        let hunted = ["GodZilla", "Beast", "Giant", "Ghost"];
        let hunt = Math.floor(Math.random() * hunted.length)
        let money = Math.floor(Math.random() * 5000) + 500;
        let t = `wallet`
        cs.addMoney({
            guild: message.guild,
            user: message.author,
            wheretoPutMoney: t,
            amount: money
        });

        message.channel.send(`${message.author.username} hunted a **${hunted[hunt]}**\nIt was difficult.\nSomehow you managed to defeat it and earned ${client.config.EMOJI}**${money}**!`);
        }
        cd.add(message.author.id);
        setTimeout(() => {
            cd.delete(message.author.id)
            message.channel.send(`<@${message.author.id}> \`e!hunt\` is ready!`)
        }, 60000);
    }
}