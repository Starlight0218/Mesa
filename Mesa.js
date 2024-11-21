


// constants
const commandHandeler = require('./commands/commandHandeler.js')
const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const prefix = '-';
const none = '';
const weird = '-';
const Weird2 = '+';

// bot login 
client.login(token);

//console log once the bot is online.
client.once('ready', () =>{
    console.log('Mesa is here!');
});


//main commands fot the bot
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if(command === 'context'){
        message.channel.send('Insert here');
    }else if(command == 'version'){
            message.channel.send('I am in version 1.0.0');
    }else if(command){
        commandHandeler(commands);
    }
        
    
});

client.on('message', message =>{
   let args = message.content.substring(none.length).split(" ");
   switch(args[0]){
    case 'hi':
        message.channel.send('Henwo Comrad!');
        break;
    case 'Hi':
        message.channel.send('Henwo Comrad!');
        break;
    case 'HI':
        message.channel.send('HENWO COMRAD!!!');
        break;
    case 'hI':
        message.channel.send('Henwo Comrad!');
        break;
   }
})





client.on('message', message=>{
    let arg = message.content.substring(prefix.length).split(" ");
    switch(arg[0]){
        case 'clear':
            if(!arg[1]) return message.reply('ERROR PLEASE DEFINE CLEAR NUMBER')
            message.channel.bulkDelete(arg[1]);
            break;
    }
})



// /*
// This is all a bet that i lost twords michael and a promis i made, i hate it, and i'll have to keep this in due to his request!
// */
// client.on('message', message=>{
//     let eat = message.content.substring(weird.length).split(" ");
//     switch(eat[0]){ 
//         case 'EatMe':
//             if(eat[1] === 'bio'){
//                 message.channel.send('I enjoy having my flesh torn from my body with blood and bone being revealed and then watching as its consumed while asking how it tastes. I will then proceed to scream from the pain and ask you to eat the rest of me so I can die in painful bliss.');
//             }else{
//                 message.channel.send('Eat Me has multiple diffrent commands, Please be more specific! Also Do not do this ever again')
//             }
//             break;
//     }
// })