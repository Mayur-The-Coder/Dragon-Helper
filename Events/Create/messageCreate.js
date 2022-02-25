const client = require('../../index.js');
const { PREFIX } = require('../../config.json');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;
CurrencySystem.cs.on('debug', (debug, error) => {
 // console.log(debug);
  if (error) console.error(error);
});
const { MONGOURL } = require('../../config.json')

cs.setMongoURL(MONGOURL, false)
cs.setDefaultBankAmount(50);
cs.setDefaultWalletAmount(10)


client.on('messageCreate', async (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(PREFIX)) return;
  if(!message.guild) return;
  if(!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
// if(command) command.run(client, message, args, cs)

  if(command) {

    
    //USER PERMISSION
    if(!message.member.permissions.has(command.userPerms || [])) return message.channel.send(`You dont have \`${command.userPerms || []}\` permission`)

    //BOT PERMISSION
    if(!message.guild.me.permissions.has(command.clientPerms || [])) return message.channel.send(`I dont have \`${command.clientPerms || []}\` permission`)

    command.run(client, message, args, cs)

  }
})