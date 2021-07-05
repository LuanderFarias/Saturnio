const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Online!');
});

client.on('ready', async () => {
    client.user.setActivity(String('Em Manutenção Por: @LuanderFarias'));
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
  if (!command) return;

  if (command.permissions) {
	const authorPerms = message.channel.permissionsFor(message.author);
	if (!authorPerms || !authorPerms.has(command.permissions)) {
		return message.reply('You can not do this!');
	}
}

  if (command.args && !args.length) {
	  let reply = `You didn't provide any arguments, ${message.author}!`;

	if (command.usage) {
		reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
	}

	  return message.channel.send(reply);

  if (command.guildOnly && message.channel.type === 'dm') {
	  return message.reply('So Consigo Usar Esse Comando Em Servidores...');
  }
}

	try {
    command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('404!');
	}
});

client.on('message', message => {
	if (message.content === `${prefix}dping`) {
		message.channel.send('pong! Meu ping atual é '+ client.ws.ping +'ms');
	} else if (message.content === `${prefix}beep`) {
		message.channel.send('Boop.');
	}
});

client.on('message', message => {
	if (message.content === `${prefix}server`) {
		message.channel.send(`Nome Do Server: ${message.guild.name}\nmembros: ${message.guild.memberCount}`);
	}
});

client.on('message', message => {
	if (message.content === `${prefix}me`) {
    message.channel.send(`Nome De Usuario: ${message.author.username}\nSeu ID: ${message.author.id}`);
	}
});

client.login(process.env.TOKEN);