const Discord = require("discord.js");
const ayar = require('../settings.js');
const registerData = require('../models/register.js');
const { Register } = require('../helpers/functions.js');
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && ayar.roles.registerStaff.some(s => !message.member.roles.cache.has(s))) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member);
    let data = await registerData.findOne({ guildID: message.guild.id, userID: member.id })
    if (!data) return message.channel.send(embed.setDescription(`${member}, üyesinin kayıt verisi bulunamadı!`)).sil(7)
    message.channel.send(embed.setDescription(`
 ${member} üyesinin Toplam **${data.Total}** (Erkek **${data.Man}**, Kız **${data.Woman}**)
`)).sil(10)
    message.react(ayar.emojis.yes).catch(e => {})
};
exports.config = {
    name: "teyitbilgi",
    guildOnly: true,
    aliases: ["info"],
    cooldown: 3000
};