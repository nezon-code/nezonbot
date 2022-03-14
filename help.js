const Discord = require('discord.js');
const home = require('home');
const config = require(home.resolve() + '/config.json');
module.exports = {
	name: 'help',
  aliases: ['commands', 'stop', 'exit', 'tutorial'],
	description: 'You already know what this does normally, but if you @mention someone after the command, I\'ll send them an insult. ;)',
  cooldown: 10,
	execute(message, args, commands, devMode) {
    if (!args.length) {

      const helpEmbed = new Discord.MessageEmbed()
        .setColor(config.botColor)
        .setTitle(`${config.botName} Help`)
        .setDescription(`To learn more about any specific command, type \`${config.prefix} help <command>\`.`)
        .addFields(
          { name: 'Bot Info', value: '`about`, `help`, `updates`, `test`' }
        );

      message.channel.send(helpEmbed);

    } else if (message.mentions.users.size == 1) {
		  try {
        message.channel.send(`Too bad, you are beyond help, ${args.join(" ")}!`);
      } catch {
        console.log(`Message send error -- ${config.prefix} help @user`);
      };
    } else {
      
      const helpName = commands.get(args[0].toLowerCase());
      if (!helpName) {
        message.channel.send('Sorry, I can\'t provide help because that command isn\'t supported. Check for typos or try another one!');
      } else {
        const helpEmbed = new Discord.MessageEmbed()
        .setColor(prefix.botColor)
        .setTitle(config.prefix + ' ' + helpName.name)
        .setDescription(helpName.description);

        message.channel.send(helpEmbed);
      };

    };
	}
};