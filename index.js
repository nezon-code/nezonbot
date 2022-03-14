// Constants - any value that won't change
const fs = require('fs');
const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js');
const config = require('./config.json');
var client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	};
};
   ...
   steps:
      - name: Git checkout
        uses: actions/checkout@v2

      - name: Use Node 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x

      - name: Install Dependencies (prod)
        run: yarn install --frozen-lockfile --production

      - name: Run Tests (JEST)
        run: yarn test --ci --silent --testPathIgnorePatterns=experimental
        env:
          CI: true
          API_KEY: ${{ secrets.DISCORD_BOT_SECRET }}
const cooldowns = new Discord.Collection();
const token = process.env.API_KEY;

// Variables - any value that might change and placeholders for value storage
var args;
var command;

// Developer dashboard

// Keep shut off - set to true to prevent the repl from automatically running on its own
var shutOff = config.shutOff;
if (shutOff) {
  throw new Error('The bot has been manually shut off. Toggle this in index.js to re-enable it.');
};

// Toggle devMode - this allows whoever is set as the bot owner to test potentially unstable features without the risk of others breaking something
var devMode = config.devMode;
if (devMode) {
  console.log('Devmode has been enabled. If this isn\'t intended, be sure to disable it and restart the bot.');
};

// Purge the database! Only for use in the most dire of circumstances.
if (config.purgeDatabase) {
  db.list().then(keys => {
    for (i = 0; i < keys.length; i++) {
      db.delete(keys[i]).then(() => {}); //empty() purges the database for nodejs, no need for for loop here
    };
  });
};

// When bot is booted up
client.on('ready', () => {
  console.log(`${config.botName.toUpperCase()} has booted up!`);
  setStatus();
});

// When message is sent
client.on('message', message => {
if (!message.author.bot) {
  if (message.content === 'hi') {
	message.channel.send('e')
	}
}
if (!message.author.bot) {
  if (message.content.includes ('rick roll all')) {
	message.channel.send('https://tenor.com/view/rick-roll-rick-ashley-never-gonna-give-you-up-gif-22113173')
	}
}
if (!message.author.bot) {
  if (message.content.includes ('e')) {
		message.react('🇪')
	}
} args = message.content.slice(config.prefix.length).trim().split(/ +/);
  command = args.shift().toLowerCase();

  // Ignore all messages that are not from the bot owner in devMode
  if (!devMode || config.botOwners.includes(message.author.id) || message.author.bot) {

    // Instant checks - these are pertinent to features that scan messages without the bot's prefix (nothing here right now)
    

    // Command framework - all code that runs when a command is sent
    if (!message.content.toLowerCase().startsWith(config.prefix) || message.author.bot) return;

    console.log(`Usage activity detected on ${new Date()}`);
    
    if (!message.author.bot) {

      if (client.commands.has(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) {
        if (!client.commands.has(command)) {
          command = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command)).name; /* Command alias code */
        };

        // Cooldown code
        if (!cooldowns.has(command)) {
        	cooldowns.set(command, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command);
        const cooldownAmount = (client.commands.get(command).cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Not so fast, ${message.author}! You need to wait ${timeLeft.toFixed(1)} more seconds before using \`${config.prefix + ' ' + command}\` again.`);
          }
        } else {
          timestamps.set(message.author.id, now);
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

        try {
          // Special command calculations - mostly used when values need to be accessible in both index.js and the command's JS file

          // Help
          if (command == 'help') {
            client.commands.get(command).execute(message, args, client.commands, devMode);
            return;
          };

          // Normal commands
          client.commands.get(command).execute(message, args, client, devMode);

          // Runs when an error occurs during command execution
        } catch (error) {
          console.error(error);
          message.channel.send('Oh no! Something went wrong.');
        };

        // Commands without their own JS file
      } else {

          // Devmode
        if (command == 'dev') {
          if (config.botOwners.includes(message.author.id)) {
            if (devMode) {
              devMode = false;
              setStatus();
            } else {
              devMode = true;
              setStatus();
            };
          } else {
            message.channel.send(`Sorry, ${message.author}, only the bot owner(s) can toggle devmode.`);
          };

          // Unrecognized command
        } else {
          message.channel.send(`Sorry, I didn\'t recognize that command. Check for typos!\nType \`${config.prefix} help\` to discover all of the commands you can use. \nIf you\'re playing a game, you don\'t need the ${config.prefix} prefix to submit your answer.`);
          console.log('Unrecognized command: ' + command);
        };
      };
    };

    // When devMode is on, if someone other than those specified in the corresponding if statement tries to use the bot, this message will be sent instead.
  } else {
    if (devMode && message.content.toLowerCase().startsWith(config.prefix)) {
      message.channel.send(`I\'m in devmode right now, which means that I\'m unstable and can\'t be accessed until what the bot owner(s) are working on is finished. Try again later!`);
    } else {
      //console.log('Hmm, something weird is going on.')
    };
  };
});

// When bot is booted up, access Discord
client.login(token);

// Sets the bot's playing/watching status
function setStatus(status) {
  if (devMode) {
    client.user.setActivity('devmode', { type: 'PLAYING' });
  } else {
    if (status == null) {
      client.user.setActivity(`for the '${config.prefix}' prefix`, { type: 'WATCHING' });
    } else {
      client.user.setActivity(`${status}`, { type: 'PLAYING' });
    };
  };
};

keep_alive();
