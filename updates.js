const Discord = require('discord.js');
const home = require('home');
const config = require(home.resolve() + '/config.json');
module.exports = {
	name: 'updates',
  aliases: ['version', 'changelog', 'update', 'log'],
	description: 'Sends a changelog, letting you know what\'s new!',
  cooldown: 10,
	execute(message, args, client, devMode) {
    var helpEmbed;
    if (args[0] != 'old') {
      // New updates go here -- put old updates below
      helpEmbed = new Discord.MessageEmbed()
        .setColor(config.botColor)
        .setTitle('Update Log')
        .addFields(
          { name: '4/14/21 - v.0.1', value: `
          - I'm alive! I'M ALIVE!!!
          `},
          { name: '---', value: `To see older versions, type \`${config.prefix} updates old\`. (There are currently no older versions.)`}
        );
    } else {
      // Put old updates here
      helpEmbed = new Discord.MessageEmbed()
        .setColor(config.botColor)
        .setTitle('Update Log (older versions)')
        .addFields(
          { name: `To see newer versions, type \`${config.prefix} updates\`.`, value: '---'},
          { name: 'There are currently no older versions.', value: `
          Because I'm so new and awesome, there's nothing here yet. As I continue to update and become more useful, old update notes will be moved here.
          ` },
        );
    };

      message.channel.send(helpEmbed);
	}
};