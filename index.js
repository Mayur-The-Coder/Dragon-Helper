const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX, MONGOURL } = require('./config.json');
const fs = require('fs')
const client = new Client({
    intents: 32767
});
const mongoose = require("mongoose");

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands");
client.events = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json')

module.exports = client;



["Command", "Event"].forEach(handler => {
  require(`./Structures/${handler}`)(client);
});

client.once('ready', () => {
  console.log(`[READY] ${client.user.tag} is ready`)
  client.user.setActivity("Epic-RPG Clan", {type: 'WATCHING'})
  client.user.setStatus('dnd')
  // setTimeout(() => {
  //   client.channels.cache.get('932958499594465341').send(`${client.user.tag} has returned!\n**${client.ws.ping}ms**`)
  // }, 3000)
  mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log('[DATABASE]: Connected To Database')
})
});

process.on('unhandledRejection', err => {
  console.log(`[ERROR]:${err.message}.`);
  console.log(err);
});

client.login(TOKEN);