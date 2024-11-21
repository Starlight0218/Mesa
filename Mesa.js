


// constants
const commandHandler = require('./commands/commandHandler.js');
const { Client, GatewayIntentBits } = require('discord.js');
const consts = require('./allConst.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Needed for bot functionality in guilds
        GatewayIntentBits.GuildMessages, // Needed to read messages in guilds
        GatewayIntentBits.MessageContent // Needed to read message content
    ]
});

// bot login 
client.login(consts.token);

//console log once the bot is online.
client.once('ready', () => {
    console.log('${consts.BOT_NAME} is here!');
});


//main commands fot the bot
client.on('messageCreate', message => {
    if (!message.content.startsWith(consts.PREFIX) || message.author.bot) return;
    if (message.content.startsWith(consts.PREFIX)) {
        const args = message.content.slice(consts.PREFIX.length).split(/ +/);
        const command = args.shift().toLowerCase();

    if (command === 'context') {
        message.channel.send('Insert here');
    } else if (command == 'version') {
        message.channel.send(consts.VERSION);
    } else if (command) {
        commandHandeler(message);
    }
    }
    const args = message.content.split(' ');
    const command = args[0].toLowerCase();

    if (args.length > 1 && args[1].toLowerCase() === consts.BOT_NAME.toLowerCase()) {
        if (command === 'hi') {
            // Respond differently if the message is in uppercase
            if (message.content === message.content.toUpperCase()) {
                message.channel.send('HENWO COMRAD!!!');
            } else {
                message.channel.send('Henwo Comrad!');
            }
        }
    }
});



//function to reply to hi
client.on('message', message => {
    let args = message.content.split(" ");
    let command = args[0].toLowerCase();
//makes sure that the message is in the correct format and if it has the bot name.
    if (args.length > 1 && args[1].toLowerCase() == consts.BOT_NAME.toLowerCase()) {
        switch (command) {
            case 'hi':
                //is the message is uppercase
                if (message.content == message.content.toUpperCase()) {
                    message.channel.send('HENWO COMRAD!!!');
                } else {
                    //defult reply
                    message.channel.send('Henwo Comrad!');
                }
                break;
        }
    }
});

//clear bug report
client.on('message', message => {
    let arg = message.content.substring(consts.PREFIX.length).split(" ");
    switch (arg[0]) {
        case 'clear':
            if (!arg[1]) return message.reply('ERROR PLEASE DEFINE CLEAR NUMBER')
            message.channel.bulkDelete(arg[1]);
            break;
    }
})
