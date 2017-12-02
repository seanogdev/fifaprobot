const Discord = require('discord.js')
const express = require('express')
const admin = require('firebase-admin')

const path = require('path')
const app = express()
const client = new Discord.Client()
const token = process.env.DISCORD_BOT_TOKEN

console.log(process.env)

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong')
  }
})

client.login(token)

app.set('port', process.env.PORT)
app.use(express.static(path.resolve(__dirname, '/public')))

app.get('/', function (request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'))
})
