import {Client} from 'discord.js'
const client = new Client()
const token = process.env.DISCORD_BOT_TOKEN

client.on('ready', () => {
    console.log('Ready!');
})

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

client.login(token)