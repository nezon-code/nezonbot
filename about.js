const Discord = require('discord.js');
const home = require('home');
const config = require(home.resolve() + '/config.json');
const dateCreated = new Date(2021, 3, 14);
var today = new Date();
var ageString;
var ageDays;
var ageWeeks;
var ageMonths;
var ageYears;
module.exports = {
	name: 'about',
  aliases: ['', 'info', 'invite', 'privacy', 'data', 'Are you collecting my data?', 'what do you know about me', 'server', 'manual', 'add', 'join', 'vote', 'report', 'bug', 'bugs', 'facts', 'issues', 'filter', 'age', 'source', 'suggest'],
	description: 'Sends general info about me, such as purpose, source code, and version.',
  cooldown: 10,
	execute(message, args, client, devMode) {
    today = new Date();
    ageDays = Math.floor((today - dateCreated) / 86400000);
    ageString = '';
    if (ageDays >= 7) {
      if (ageDays / 7 >= 4) {
        if (ageDays / 28 >= 12) {
          ageYears = Math.floor(ageDays / 365.25);
          if (ageYears == 1) {
            ageString += `1 year, `;
          } else {
            ageString += `${ageYears} years, `;
          };
        };
        ageMonths = Math.floor(ageDays / 28) % 12;
        if (ageMonths == 1) {
          ageString += `1 month, `;
        } else {
          ageString += `${ageMonths} months, `;
        };
      };
      ageWeeks = Math.floor(ageDays / 7) % 4;
      if (ageWeeks == 1) {
        ageString += `1 week, `;
      } else {
        ageString += `${ageWeeks} weeks, `;
      };
    };
    if (ageDays % 7 == 1) {
      ageString += `1 day old`;
    } else {
      ageString += `${ageDays % 7} days old`;
    };

    const helpEmbed = new Discord.MessageEmbed()
      .setColor(config.botColor)
      .setTitle('About me')
      .attachFiles(['icon.png'])
      .setThumbnail('attachment://icon.png')
      .setDescription(`
      Hi there! I'm ${config.botName}, and I do useful things for your server.
      Type \`${config.prefix} help\` to see a list of commands I can execute.\n

      **Some fun facts about me:**
      - I'm ${ageString}
      - My creator is @lisa_wolfgang
      - I'm hosted on repl.it
      - I'm the best at everything
      `)
      .setFooter(`---   ${config.botName} v.${config.version}   -------------------------------`);

    message.channel.send(helpEmbed);

	}
};