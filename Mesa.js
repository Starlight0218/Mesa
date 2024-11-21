// Import necessary modules and constants
const commandHandler = require('./commands/commandHandler.js');
const { Client, GatewayIntentBits } = require('discord.js');
const consts = require('./allConst.js');

// Create a new Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Needed for bot functionality in guilds
        GatewayIntentBits.GuildMessages, // Needed to read messages in guilds
        GatewayIntentBits.MessageContent // Needed to read message content
    ]
});

// Log in the bot
client.login(consts.token);

// Console log once the bot is online
client.once('ready', () => {
    console.log(`${consts.BOT_NAME} is here!`);
});

// Main event listener for commands and interactions
client.on('messageCreate', message => {
    // Ignore bot messages and messages without the prefix
    if (message.author.bot) return;

    // Check if message starts with the bot's prefix
    if (message.content.startsWith(consts.PREFIX)) {
        const args = message.content.slice(consts.PREFIX.length).split(/ +/);
        const command = args.shift().toLowerCase();

        // Basic command handling
        if (command === 'context') {
            message.channel.send('Insert here');
        } else if (command === 'version') {
            message.channel.send(consts.VERSION);
        } else if (command === 'clear') {
            // Handle 'clear' command
            const amount = parseInt(args[0], 10);
            if (!amount || amount <= 0) {
                return message.reply('Please specify a valid number of messages to delete.');
            }

            // Attempt to delete messages
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('An error occurred while trying to delete messages.');
            });
        } else {
            // Pass to command handler for other commands
            commandHandler(message);
        }
    }

    // Handle greetings (hi/Hi/HI) mentioning the bot
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
