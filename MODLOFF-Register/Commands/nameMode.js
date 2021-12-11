const Discord = require("discord.js");
const ayar = require('../settings.js');
const registerData = require('../models/register.js');
const { Register } = require('../helpers/functions.js');
module.exports.run = async(client, message, args, embed) => {
    if (!ayar.bot.botOwner.includes(message.author.id)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let data = await registerData.findOne({ guildID: message.guild.id });
if(!data) new registerData({guildID: message.guild.id, nameMode: false}).save();
    switch (args[0]) {
        case "aç":
            if (data && data.nameMode === true) return message.channel.send(embed.setDescription(`${client.emojis.cache.get(ayar.emojis.no)} İsim modu zaten aktif`));
            data.nameMode = true;
            data.save();
            message.channel.send(embed.setDescription(`${message.member}, İsim modu başarıyla açıldı!`)).sil(7);
            break;
        case "kapat":
            if (data && data.nameMode === false) return message.channel.send(embed.setDescription(`${client.emojis.cache.get(ayar.emojis.no)} İsim modu zaten deaktif`));
            data.nameMode = false;
            data.save();
            message.channel.send(embed.setDescription(`${message.member}, İsim modu başarıyla kapatıldı!`)).sil(7);
            break;
        default:
            return message.channel.send(embed.setImage("").setDescription(`İsim modu açık iken kayıt mesajında geçmiş isimler görüntülenir kapalı iken görüntülenmez \n \`\`\`${ayar.bot.botPrefix}${this.config.name} aç/kapat\`\`\` `)).sil(20);
            break;
    }
};
exports.config = {
    name: "isim-mod",
    guildOnly: true,
    aliases: ["isimmod"],
    cooldown: 3000
};
