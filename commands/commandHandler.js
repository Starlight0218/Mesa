module.exports = (message) => {
    console.log('Command received by handler:', message.content); // Log the command
    const command = message.content.slice(1).toLowerCase();

    switch (command) {
        case 'help':
        case 'commands':
            message.channel.send('Available commands: context, version, help');
            break;

        default:
            message.channel.send('Unknown command. Type "-help" for a list of commands.');
            break;
    }
};
