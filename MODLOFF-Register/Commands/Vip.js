const Discord = require("discord.js");
const ayar = require('../settings.js');
const { Register } = require('../helpers/functions.js');
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && ayar.roles.vipStaff.some(s => !message.member.roles.cache.has(s))) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye ve isim belirtmelisin dostum.`)).sil(7)
    if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${message.member}, Kendine vip veremezsin dostum.`)).sil(7)
    if (member.user.bot) return message.channel.send(embed.setDescription(`${message.member}, bir bota vip vermeye mi çalışıyorsun? kafayı yemiş olmalısın :D`)).sil(7)
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Belirttiğin üye senden üst/aynı pozisyonda!`)).sil(7)

    if (member.roles.cache.has(ayar.roles.vipRole)) {
        await member.roles.remove(ayar.roles.vipRole).catch(err => {});
        message.channel.send(embed.setDescription(`${member}, üyesinden ${message.guild.roles.cache.get(ayar.roles.vipRole)} rolü alındı.`)).sil(7)

    } else {

        await member.roles.add(ayar.roles.vipRole).catch(err => {});
        message.channel.send(embed.setDescription(`${member}, üyesine ${message.guild.roles.cache.get(ayar.roles.vipRole)} rolü verildi.`)).sil(7)
    }
    message.react(ayar.emojis.yes).catch(e => {})
};
exports.config = {
    name: "vip",
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};