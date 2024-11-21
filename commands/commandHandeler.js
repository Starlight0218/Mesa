commands = 'Good commands are $Info version, $Context, $clear (number of messages), Replies; hi, and Hi.';

module.export = (message) => {
    if (message.content == 'commands') {
        message.channel.send(
            commands
        );
    } else if (message.content == 'help') {
        message.channel.send(
            commands
        );

    }
}

