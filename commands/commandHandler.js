const commands = 'Good commands are $Info version, $Context, $clear (number of messages), Replies; hi, and Hi.';

module.exports = (message) => {
    const command = message.content.toLowerCase();
    switch(command){
        case 'commands':
        case 'help':
            message.channel.send(commands);
            break;
    }
};

