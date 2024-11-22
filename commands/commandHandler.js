module.exports = (context) => {
    const isMessage = context.content !== undefined; // Check if it's a message or interaction
    const command = isMessage
        ? context.content.slice(1).toLowerCase() // Extract command from message
        : context.commandName; // Use commandName for slash commands

    console.log('Command received by handler:', command);

    switch (command) {
        case 'commands':
            if (isMessage) {
                context.channel.send('Available commands: context, version, help, clear, invite, github, discord');
            } else {
                context.reply('Available commands: context, version, help, clear, invite, github, discord');
            }
            break;

        default:
            if (isMessage) {
                context.channel.send('Unknown command. Type "/help" for a list of commands.');
            } else {
                context.reply('Unknown command. Type "/help" for a list of commands.');
            }
            break;
    }
};
