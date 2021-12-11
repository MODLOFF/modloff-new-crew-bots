const Discord = require("discord.js");
const ayar = require('../settings.js');
const registerData = require('../models/register.js');
const { Register } = require('../helpers/functions.js');
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && ayar.roles.registerStaff.some(s => !message.member.roles.cache.has(s))) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    if (!member) return message.channel.send(embed.setDescription(`${message.member}, bir kullanıcı etiketle.`)).sil(7)
    let data = await registerData.find({ guildID: message.guild.id, userID: member.id })
    if (!data || !data.length) return message.channel.send(embed.setDescription(`${member}, üyesinin geçmiş isimleri bulunamadı!`)).sil(7)
    let mapped = data.map((value, index) => `\`${index +1}.\` \`${value.Name}\` (${message.guild.roles.cache.get(value.Sex)})`).slice(data.length > 10 ? data.length - 10 : 0, data.length).join('\n')
    message.channel.send(embed.setDescription(`
${member} üyesinin geçmiş isimleri.

${mapped}
`)).sil(10)
    message.react(ayar.emojis.yes).catch(e => {})
};
exports.config = {
    name: "isimler",
    guildOnly: true,
    aliases: [],
    cooldown: 3000
};