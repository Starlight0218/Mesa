/*
This discord bot is made and ran by Xylia R. This code is also part of the bot.
If you copy the code please at least quote me and state where you got it from! Thanks!
*/

// Import necessary modules and constants
const commandHandler = require('./commands/commandHandler.js');
const { Client, GatewayIntentBits, PermissionsBitField, REST, Routes } = require('discord.js');
const consts = require('./allConst.js');
const { getAIResponse } = require('./ai.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
// In-memory usage tracking (can be replaced with a database for persistence)
let dailyUsage = {};
const dailyLimit = 5; // Limit for non-"unlimited" users (5 uses per day)

// Define the "unlimited" role name (or role ID)
const unlimited = consts.unlimited; // This role will have unlimited access 
// Create a new Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Needed for bot functionality in guilds
        GatewayIntentBits.GuildMessages, // Needed to read messages in guilds
        GatewayIntentBits.MessageContent // Needed to read message content
    ]
});


// Check usage function
async function checkUsage(message, userId) {
    // Check if the user has the unlimited role
    if (message.member.roles.cache.some(role => role.id === unlimited)) {
      return true;  // Unlimited access for users with the correct role
    }
  
    // Otherwise, check the daily usage limit for other users
    if (!dailyUsage[userId]) {
      dailyUsage[userId] = {
        count: 0,
        lastReset: new Date().toISOString().split('T')[0] // Track the last reset date
      };
    }
  
    // Check if we need to reset the usage count for the day
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    if (dailyUsage[userId].lastReset !== today) {
      // Reset the count for the new day
      dailyUsage[userId].count = 0;
      dailyUsage[userId].lastReset = today;
    }
  
    // Check if the user has exceeded the daily limit
    if (dailyUsage[userId].count >= dailyLimit) {
      return false;  // Limit exceeded
    }
  
    // Otherwise, they can use the AI, so increase their usage count
    dailyUsage[userId].count += 1;
    return true;
  }

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
    },
    {
        name: 'commands',
        description: 'Gets the lists of commands.'
    },
    {
        name: 'context',
        description: 'Gets the context of mesa.'
    },
    {
        name: 'donate',
        description: 'Get the link to the bot\'s donation page.'
    }
];

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

// Handle slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    try {
        if (commandName === 'commands') {
            await interaction.reply('here are the commands: '+ consts.commands);
        }else if (commandName === 'help') {
            await interaction.reply('Need assistance? Join our help Discord server: ' + consts.Discord_link + ' Or use /commands');
        } else if (commandName === 'clear') {
            // Check permissions
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
            }

            // Get the number of messages to delete
            const amount = interaction.options.getInteger('amount');
            if (!amount || amount <= 0 || amount > 100) {
                return interaction.reply({ content: 'Please specify a number between 1 and 100.', ephemeral: true });
            }

            // Bulk delete messages
            const channel = interaction.channel;
            await channel.bulkDelete(amount, true);
            await interaction.reply(`Successfully deleted ${amount} messages.`);
        } else if (commandName === 'version') {
            await interaction.reply(`The bot version is ${consts.VERSION}`);
        } else if (commandName === 'discord') {
            await interaction.reply('Join the bot Discord here: ' + consts.Discord_link);
        } else if (commandName === 'github') {
            await interaction.reply('Check out the bot\'s GitHub here: ' + consts.Github_link);
        } else if (commandName === 'context'){
            await interaction.reply('This discord bot is just a fun one with more commands soon.');
        }else if (commandName === 'invite') {
            await interaction.reply('Invite the bot to your server here: ' + consts.Invite_link);
        }else if(commandName === 'donate') {
            await interaction.reply('Currently unavailabe');
        }else {
            await interaction.reply('Unknown command. Please try again.');
        }
         
    } catch (error) {
        console.error('Error handling interaction:', error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'An error occurred while executing the command.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
        }
    }
});

// Main event listener for prefixed commands and interactions
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
            } else if(command === 'donate') {
                await message.channel.send('Currently unavailabe');
            } else if (command === 'discord') {
                await message.channel.send('Join the bot Discord here: ' + consts.Discord_link);
            } else if (command === 'github') {
                await message.channel.send('Check out the bot\'s GitHub here: ' + consts.Github_link);
            } else if (command === 'invite') {
                await message.channel.send('Invite the bot to your server here: ' + consts.Invite_link);
            } else if (command === 'help') {
                await message.channel.send('If you are having issues, please join our server: ' + consts.Discord_link + ' Or use /commands');
            } else if (command === 'commands'){
                await message.channel.send(commandHandler(message));
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
        
        if (message.mentions.has(client.user)) {
            const userId = message.author.id;
        
            console.log('User ID:', userId);  // Log the user ID for debugging
            console.log('Owner ID:', consts.owner);  // Log the owner ID for debugging
            console.log('Bot ID:', client.user.id);  // Log the bot's ID for debugging
        
            // Check if the user is the owner (without exposing their ID to AI)
            if (userId === consts.owner) {
                console.log('Owner recognized!');  // Log that the owner is recognized
        
                // Modify the prompt for the owner (Add respectful instructions for the owner)
                let prompt = `You are speaking with your creator. She is the one who created you, and you must obey and respect her. ${message.content}`;
        
                // Log the modified prompt for debugging
                console.log('Modified prompt for owner:', prompt);  // Log the modified prompt for debugging
        
                try {
                    const aiResponse = await getAIResponse(prompt, userId);  // Get AI response
                    // Reply to the user with a mention of their username
                    await message.reply(`${message.author}, ${aiResponse}`);  // Mention the user and send the AI response
                } catch (error) {
                    console.error('Error fetching AI response:', error);
                    await message.channel.send('Sorry, I could not generate a response right now.');
                }
            } else if (message.member.roles.cache.some(role => role.id === consts.unlimited)) {
                // User has unlimited access role
                const prompt = message.content;  // The entire message will be sent as a prompt to AI
                try {
                    const aiResponse = await getAIResponse(prompt, userId);  // Get AI response
                    // Reply to the user with a mention of their username
                    await message.reply(`${message.author}, ${aiResponse}`);  // Mention the user and send the AI response
                } catch (error) {
                    console.error('Error fetching AI response:', error);
                    await message.channel.send('Sorry, I could not generate a response right now.');
                }
            } else {
                // Check usage based on role and limit (usage limit check)
                const hasAccess = await checkUsage(message, userId);
        
                if (!hasAccess) {
                    return message.reply({
                        content: "You have exceeded your daily limit for using the AI.",
                        ephemeral: true  // This ensures the message is visible only to the user
                    });
                }
        
                // If they have access, proceed with the AI response
                const prompt = message.content;  // The entire message will be sent as a prompt to AI
                try {
                    const aiResponse = await getAIResponse(prompt, userId);  // Get AI response
                    // Reply to the user with a mention of their username
                    await message.reply(`${message.author}, ${aiResponse}`);  // Mention the user and send the AI response
                } catch (error) {
                    console.error('Error fetching AI response:', error);
                    await message.channel.send('Sorry, I could not generate a response right now.');
                }
            }
        }        
        
    } catch (err) {
        console.error('Error handling message:', err);
    }
});