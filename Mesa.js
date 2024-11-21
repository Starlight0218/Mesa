


// constants
const consts = require('./allConst.js');
const client = new Discord.Client();


// bot login 
client.login(consts.token);

//console log once the bot is online.
client.once('ready', () => {
    console.log('${consts.BOT_NAME} is here!');
});


//main commands fot the bot
client.on('message', message => {
    if (!message.content.startsWith(consts.PREFIX) || message.author.bot) return;

    const args = message.content.slice(consts.PREFIX.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (command === 'context') {
        message.channel.send('Insert here');
    } else if (command == 'version') {
        message.channel.send(consts.VERSION);
    } else if (command) {
        commandHandeler(message);
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
