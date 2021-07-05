const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Lista De Comandos',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
    const { commands } = message.client;
    if (!args.length) {
	    data.push('Lista De Comandos:');
	    data.push(commands.map(command => command.name).join(', '));
	    data.push(`\nVocé Pode Digitar \`${prefix}help [command name]\` Para Saber De Um Comando Especifico!`);

	  return message.author.send(data, { split: true })
		  .then(() => {
			  if (message.channel.type === 'dm') return;
			  message.reply('Enviei Os Comando Por DM Menobre');
		})
		  .catch(error => {
			  console.error(`Erro Mandando DM Para ${message.author.tag}.\n`, error);
			  message.reply('Voce Tem As DMs Ativadas?);
		});
    }
    
    const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
	    return message.reply('Comando Invalido...');
    }

    data.push(`**Nome:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Descrição:** ${command.description}`);
    if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s)`);

    message.channel.send(data, { split: true });
	},
};