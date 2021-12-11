const Discord = require("discord.js");
const ayar = require('../settings.js');
const registerData = require('../models/register.js');
const { Register } = require('../helpers/functions.js');
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && ayar.roles.registerStaff.some(s => !message.member.roles.cache.has(s))) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let data = await registerData.find({ guildID: message.guild.id })

    let x = data.filter(s => s.Total > 0 && message.guild.members.cache.has(s.userID)).sort((a, b) => b.Total - a.Total).map((a, i) => `\`${i +1}.\` ${message.guild.members.cache.get(a.userID)} üyesinin toplam **${a.Total}** (Erkek **${a.Man}** - Kız **${a.Woman}**)`).slice(0, 15).join('\n')

    message.channel.send(embed.setDescription(`
    Sunucuya ait kayıt verileri: 
    
    ${x}`).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))).sil(15)
    message.react(ayar.emojis.yes).catch(e => {})
};
exports.config = {
    name: "top",
    guildOnly: true,
    aliases: ["topinfo"],
    cooldown: 3000
};