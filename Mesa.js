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

// Log errors
client.on('error', console.error);

// Main event listener for commands and interactions
client.on('messageCreate', async (message) => {
    try {
        // Ignore bot messages
        if (message.author.bot) return;

        // Handle commands (prefixed with consts.PREFIX)
        if (message.content.startsWith(consts.PREFIX)) {
            const args = message.content.slice(consts.PREFIX.length).split(/ +/);
            const command = args.shift().toLowerCase();

            // Basic command handling
            if (command === 'context') {
                await message.channel.send('Insert here');
            } else if (command === 'version') {
                await message.channel.send(consts.VERSION);
            } else {
                // Pass to external command handler
                commandHandler(message);
            }
            return; // Exit after handling commands
        }

        // Handle greetings (hi/Hi/HI and hi Mesa)
        const words = message.content.split(' ');
        const firstWord = words[0].toLowerCase();

        if (firstWord === 'hi') {
            // If the bot is mentioned (e.g., "hi Mesa")
            if (words.length > 1 && words[1].toLowerCase() === consts.BOT_NAME.toLowerCase()) {
                if (message.content === message.content.toUpperCase()) {
                    await message.channel.send('HENWO COMRAD!!!');
                } else {
                    await message.channel.send('Henwo Comrad!');
                }
            } else if (words.length === 1) {
                // Handle plain "hi"
                await message.channel.send('Henwo!');
            }
        }
    } catch (err) {
        console.error('Error handling message:', err);
    }
});
