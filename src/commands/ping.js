const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
    message.channel.send('pong! Meu ping atual é '+ client.ws.ping +'ms');
	},
};