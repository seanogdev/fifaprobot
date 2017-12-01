const Discord = require('discord.js')
const express = require('express')
const app = express();
const client = new Discord.Client()
const token = process.env.DISCORD_BOT_TOKEN

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
});

client.login(token)

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})