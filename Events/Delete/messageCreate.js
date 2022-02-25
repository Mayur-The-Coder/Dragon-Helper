const client = require('../../index.js')

client.on('messageCreate', (message) => {
    if(message.content.startsWith('e!')) return;
    if(message.channel.id !== '894598105515835453') return;
    if(message.author.id == '804568979288621076') return;

    message.delete()
})