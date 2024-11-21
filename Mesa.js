/*
This discord bot is made and ran by Xylia R. This code is also part of the bot.
If you copy the code please at least quote me and state where you got it from! Thanks!
*/

// Import necessary modules and constants
const commandHandler = require('./commands/commandHandler.js');
const { Client, GatewayIntentBits, PermissionsBitField, REST, Routes } = require('discord.js');
const consts = require('./allConst.js');

// Create a new Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Needed for bot functionality in guilds
        GatewayIntentBits.GuildMessages, // Needed to read messages in guilds
        GatewayIntentBits.MessageContent // Needed to read message content
    ]
});

// Define the slash commands
const commands = [
    {
        name: 'help',
        description: 'Get help with the bot or join the help Discord server.'
    },
    {
        name: 'clear',
        description: 'Clear a specified number of messages.',
        options: [
            {
                name: 'amount',
                type: 4, // Integer
                description: 'The number of messages to delete (1-100).',
                required: true
            }
        ]
    },
    {
        name: 'version',
        description: 'Check the bot version.'
    },
    {
        name: 'discord',
        description: 'Get the invite link to the bot\'s Discord help server.'
    },
    {
        name: 'github',
        description: 'Get the link to the bot\'s GitHub repository.'
    },
    {
        name: 'invite',
        description: 'Get the link to invite the bot to your server.'
    }
];

console.log('Client ID:', consts.clientId);

// Register slash commands
const rest = new REST({ version: '10' }).setToken(consts.token);

(async () => {
    try {
        console.log('Refreshing application (/) commands...');
        await rest.put(
            Routes.applicationCommands(consts.clientId), // Make sure consts.clientId is set correctly
            { body: commands }
        );
        console.log('Successfully registered application (/) commands.');
    } catch (error) {
        console.error('Error registering application (/) commands:', error);
    }
})();


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
                await message.channel.send('This discord bot is just a fun one with more commands soon.');
            } else if (command === 'version') {
                await message.channel.send(consts.VERSION);
            } else if (command === 'discord') {
                await message.channel.send('Join the bot Discord here: ' + consts.Discord_link);
            } else if (command === 'github') {
                await message.channel.send('Check out the bot\'s GitHub here: ' + consts.Github_link);
            } else if (command === 'invite') {
                await message.channel.send('Invite the bot to your server here: ' + consts.Invite_link);
            } else if (command === 'help') {
                await message.channel.send('If you are having issues, please join our server: ' + consts.Discord_link);
            } else if (command === 'clear') {
                // Handle clear command
                if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                    return message.reply('You do not have permission to use this command.');
                }

                const amount = parseInt(args[0], 10);
                if (!amount || amount <= 0 || amount > 100) {
                    return message.reply('Please specify a number between 1 and 100.');
                }

                await message.channel.bulkDelete(amount, true).catch(err => {
                    console.error(err);
                    message.channel.send('An error occurred while trying to clear messages.');
                });

                await message.channel.send(`Successfully deleted ${amount} messages.`);
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
