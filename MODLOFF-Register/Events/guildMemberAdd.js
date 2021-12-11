const ayar = require('../settings.js');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
const registerData = require('../models/register.js');
module.exports = async member => {
        let data = await registerData.findOne({ guildID: member.guild.id })
        let kurulus = member.user.createdTimestamp
        let süphe;
        if (Date.now() - kurulus < 1000 * 60 * 60 * 24 * 10 ? süphe = "Şüpheli" : süphe = "Güvenli");

        let olusturma = `(\`${moment.duration(Date.now() - kurulus).format('Y [yıl], M [Ay], D [Gün]')}\`)`
        let channel = member.guild.channels.cache.get(ayar.channels.registerChannel);

        if (süphe === "Güvenli") {
            await member.roles.add(ayar.roles.unregisterRoles).catch(e => {});
            await member.setNickname(ayar.guild.defaultName).catch(e => {});
            if (channel) channel.send(`
            <a:mtac:915640551557189754> Sunucumuza hoş geldin ${member} - \`${member.id}\`  
			
<a:mtac:915640551557189754> Hesabın **${moment(kurulus).locale('tr').format('LLL')}** tarihinde ${olusturma} önce oluşturulmuş! ${member.guild.emojis.cache.get(ayar.emojis.yes)}       

<a:mtac:915640551557189754> Sunucu kurallarımız ${member.guild.channels.cache.get(ayar.channels.rulesChannel)} kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

<a:mtac:915640551557189754> Seninle beraber **${member.guild.memberCount}** kişiyiz! İyi eğlenceler. 🎉🎉🎉
`);
    } else {
await member.roles.set([ayar.roles.suspecious]).catch(e => {});
await member.setNickname(ayar.guild.suspeciousName).catch(e => {});

if(channel) channel.send(`
${member}, Adlı kullanıcı sunucuya katıldı fakat hesabı yeni olduğu için şüpheli hesap rolünü verdim. ${olusturma} <a:mtac:915640551557189754>`);
    }
};
//            <a:flex:913148502404653086> <#913784252997435432> **Kanalına girerek saniyeler içerisinde  <@&913784197410357248> Yetkili Arkadaslarımız Sizi kayıt Edecektir.** 
