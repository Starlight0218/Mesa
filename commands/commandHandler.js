const consts = require('./allConst.js');
module.exports = (message) => {
    console.log('Command received by handler:', message.content); // Log the command
    const command = message.content.slice(1).toLowerCase();

    switch (command) {
        case 'commands':
            message.channel.send('Available commands: context, version, help, clear');
            break;

        default:
            message.channel.send('Unknown command. Type "/help" for a list of commands.');
            break;
        case 'help':
            message.channel.send('If you are having issues please join our server: ${consts.Invite_link}');

    }
};
