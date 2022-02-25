module.exports = {
    name: 'deposit',
    description: 'Deposit money to your bank',
    usage: 'e!deposit [money]',
    aliases: ['dep', 'dp'],
    run: async(client, message, args, cs) => {
        let money = args.join(" ");
        if (!money) return message.reply("Enter the amount you want to deposit.");

        let result = await cs.deposite({
            user: message.author,
            guild: message.guild,
            amount: money
        });
        if (result.error) {
            if (result.type === 'money') return message.reply("Specify an amount to deposit");
            if (result.type === 'negative-money') return message.reply("You can't deposit negative money");
            if (result.type === 'low-money') return message.reply("You don't have that much money in wallet.");
            if (result.type === 'no-money') return message.reply("You don't have any money to deposit");
            if (result.type === 'bank-full') return message.reply("Your bank is full. It has reached it's limit.");
        } else {
            if (result.type === 'all-success') return message.reply("You have deposited all your money to your bank" + `\nNow you've $${result.rawData.wallet} In your wallet and $${result.rawData.bank} in your bank.`);
            if (result.type === 'success') return message.reply(`You have deposited $${result.amount} money to your bank.\nNow you've $${result.rawData.wallet} In your wallet and $${result.rawData.bank} in your bank.`);
        };
    
    
    }
}