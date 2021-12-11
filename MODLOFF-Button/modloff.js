const { Discord, MessageEmbed ,Client } = require('discord.js');
const client = new Client();
const { MessageButton } = require('discord-buttons')(client);
const moment = require('moment');
const cfg = require('./ayarlar.json');

client.on('ready', async => {
  client.user.setPresence({ activity: { name: "Passenger ❤️ MODLOFF" }, status: "online" });
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
 })

client.on("message", (message) => {


if (message.content !== "!rootpass" || message.author.id === cfg.bot.BotOwner || message.author.bot) return;

// BUTONLAR
//--------------------------------\\

// Çekilis Katılımcısı
let CekilisKatılımcı = new MessageButton()
  .setStyle('green') // Rengi ayarlayabilirsiniz.
  .setLabel('🎁 Çekiliş Katılımcısı') // Adını Değiştirebilirsiniz.
  .setID('CekilisKatılımcı'); // Elleme Bunu

// Etkinlik Katılımcı
let EtkinlikKatılımcı = new MessageButton()
  .setStyle('red') // Rengi ayarlayabilirsiniz.
  .setLabel('🎉Etkinlik Katılımcısı') // Adını Değiştirebilirsiniz.
  .setID('EtkinlikKatılımcı'); // Elleme Bunu



//--------------------------------\\


message.channel.send(`

Merhaba **${message.guild.name}** üyeleri,
Çekiliş katılımcısı alarak ${cfg.emojiler.nitro} , ${cfg.emojiler.spotify} , ${cfg.emojiler.netflix} , ${cfg.emojiler.exxen} , ${cfg.emojiler.blutv} gibi çeşitli ödüllerin sahibi olabilirsiniz.
Etkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.

__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__
`, { 
  buttons: [ CekilisKatılımcı, EtkinlikKatılımcı ]
});

});

client.on('clickButton', async (button) => {
  // Çekilis Katılımcısı
    if (button.id === 'CekilisKatılımcı') {
        if (button.clicker.member.roles.cache.get(cfg.roles.CekilisKatılımcı)) {
            await button.clicker.member.roles.remove(cfg.roles.CekilisKatılımcı)
            await button.think(true);
            await button.reply.edit("Cekilis Katılımcı Rolü Üzerinizden Alındı!")
        } else {
            await button.clicker.member.roles.add(cfg.roles.CekilisKatılımcı)
            await button.think(true);
            await button.reply.edit("Cekilis Katılımcı Rolü Üzerinize Verildi!")
        }
    }

  // Etkinlik Katılımcı
    if (button.id === 'EtkinlikKatılımcı') {
        if (button.clicker.member.roles.cache.get(cfg.roles.EtkinlikKatılımcı)) {
            await button.clicker.member.roles.remove(cfg.roles.EtkinlikKatılımcı)
            await button.think(true);
            await button.reply.edit(`Etkinlik Katılımcı Rolü Üzerinizden Alındı!`)
        } else {
            await button.clicker.member.roles.add(cfg.roles.EtkinlikKatılımcı)
            await button.think(true);
            await button.reply.edit(`Etkinlik Katılımcı Rolü Üzerinize Verildi!`)
        }

    }
 


});

client.login(cfg.bot.token);
