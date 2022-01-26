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

client.login('OTM1NjkxNzQ1MzUyNjM0Mzc4.YfCU2A.qxf49HyDg1WoQ3oGK41dnAWd3CE')