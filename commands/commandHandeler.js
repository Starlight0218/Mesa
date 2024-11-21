module.export = (message) => {
    if (message.content == 'commands'){
        message.channel.send(
            'Good commands are $Info version, $Context, $clear (number of messages), Replies; hi, and Hi.'
        );
    }
}