module.exports = {
	name: 'test',
  aliases: ['ping', 'online', 'speed'],
	description: 'If I\'m online, I\'ll send back a confirmation message. If I don\'t respond, I\'m likely taking a quick snack break.',
  cooldown: 0,
	execute(message, args, client, devMode) {
    const quips = [`Just got back from my snack break.`, `Would you stop checking so much?`, `I can't wait for my next snack break!`, `...Well? Don't you have better things to do than read these?`, `And not hungry anymore.`, `I'm ready to carry out all of your evil bidding.`];
		message.channel.send(`I'm currently online! ${quips[Math.floor(Math.random() * quips.length)]}`);
	},
};