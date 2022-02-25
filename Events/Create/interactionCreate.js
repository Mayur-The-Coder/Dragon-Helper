const client = require('../../index.js');
client.on("interactionCreate", async(interaction) => {
    if(!interaction.isCommand()) return;
    if(interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if(!command) return client.slashCommands.delete(interaction.commandName);

        command.execute(interaction, client)
    }
})