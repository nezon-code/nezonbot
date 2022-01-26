require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'good bot') {
      msg.reply(':DDDD');
    }
  });

client.login('OTM1NjkxNzQ1MzUyNjM0Mzc4.YfCU2A.4KUr0YoZBlecJPP6X-mGcr8aGUE')
