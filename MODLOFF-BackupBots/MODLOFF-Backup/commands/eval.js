const Discord = require('discord.js')
const ayarlar = require('../root.json');

exports.run = async (client, message, args) => {
if (ayarlar.Owner.includes(message.author.id) === false) return message.channel.send(`**Bu komutu sadece \`ROOT\` kullanabilir!**`);
    {
        if (!args[0]) return message.channel.send(`Kod belirtilmedi`);
          let code = args.join(' ');
          function clean(text) {
          if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
          text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
        };
        try { 
          var evaled = clean(await eval(code));
          if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
          message.channel.send(`${evaled.replace(client.token, "Yasaklı komut")}`, {code: "js", split: true});
        } catch(err) { message.channel.send(err, {code: "js", split: true}) };
      }
    };

exports.conf = {
   enabled: true,
    guildOnly: true,
    aliases: ['eval','ewal','deval'],
    permLevel: 0
}

exports.help = {
    name: 'eval',
    description: 'Yazılan Javascript kodu çalıştırır.',
    usage: 'eval <code>'
}