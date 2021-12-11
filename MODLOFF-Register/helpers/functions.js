const { MessageEmbed } = require('discord.js');
const ayar = require('../settings');
const client = global.client;
const moment = require('moment');
require('moment-duration-format');
const message = require('../Events/message');
let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter('Root ❤️ Wéis')
const registerData = require('../models/register.js');

Promise.prototype.sil = function(time) {
    if (this) this.then(s => {
        if (s.deletable) s.delete({ timeout: time * 1000 }).catch(e => {});
    });
};

class Register {

    static async man(user, admin, name, channel) {
        await user.roles.add(ayar.roles.manRoles).catch(err => {})
        await user.roles.remove(ayar.roles.unregisterRoles).catch(err => {})
        await user.setNickname(name).catch(err => {})
        let data = await registerData.find({ guildID: channel.guild.id, userID: user.id })
        let isimler = data.length > 0 ? data.map((value, i) => `\`${i +1}\` \`${value.Name}\` (${user.guild.roles.cache.get(value.Sex)})`).slice(data.length > 10 ? data.length - 10 : 0, data.length).join('\n') : "Bu kullanıcı daha önce kayıt olmamış!"
        let nameMode = await registerData.findOne({ guildID: channel.guild.id })
        let userData = await registerData.findOne({ guildID: channel.guild.id, userID: user.id })
        let adminData = await registerData.findOne({ guildID: channel.guild.id, userID: admin.id })
        new registerData({ guildID: channel.guild.id, userID: user.id, Name: name, Sex: ayar.roles.manRoles[0], Date: Date.now() }).save();
        if (!adminData) { new registerData({ guildID: channel.guild.id, userID: admin.id, Man: 1, Total: 1 }).save() } else { adminData.Man++, adminData.Total++, adminData.save(); }
        if (nameMode && nameMode.nameMode === true) { channel.send(embed.setDescription(`${user} üyesinin ismi başarıyla \`${name}\` olarak değiştirildi. Bu üye daha önce bu isimlerle kayıt olmuş. \n\n ${user.guild.emojis.cache.get(ayar.emojis.yes)} Kişinini toplamda **${data.length}** isim kayıtı bulundu. \n ${isimler} \n\n Kişinin önceki isimlerine \`.isimler @kullanıcı/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.`)).sil(10); } else { channel.send(embed.setDescription(`${user} üyesine ${user.guild.roles.cache.get(ayar.roles.manRoles[0])} rolü verildi.`)).sil(7); }
        if (ayar.guild.tagges.some(s => user.user.tag.toLowerCase().includes(s))) user.roles.add(ayar.roles.tagRole)
    }

    static async woman(user, admin, name, channel) {
        await user.roles.add(ayar.roles.womanRoles).catch(err => {})
        await user.roles.remove(ayar.roles.unregisterRoles).catch(err => {})
        await user.setNickname(name).catch(err => {})
        let data = await registerData.find({ guildID: channel.guild.id, userID: user.id })
        let isimler = data.length > 0 ? data.map((value, i) => `\`${i +1}\` \`${value.Name}\` (${user.guild.roles.cache.get(value.Sex)})`).slice(data.length > 10 ? data.length - 10 : 0, data.length).join('\n') : "Bu kullanıcı daha önce kayıt olmamış!"
        let nameMode = await registerData.findOne({ guildID: channel.guild.id })
        let userData = await registerData.findOne({ guildID: channel.guild.id, userID: user.id })
        let adminData = await registerData.findOne({ guildID: channel.guild.id, userID: admin.id })
        new registerData({ guildID: channel.guild.id, userID: user.id, Name: name, Sex: ayar.roles.womanRoles[0], Date: Date.now() }).save();
        if (!adminData) { new registerData({ guildID: channel.guild.id, userID: admin.id, Woman: 1, Total: 1 }).save() } else { adminData.Woman++, adminData.Total++, adminData.save(); }

        if (nameMode && nameMode.nameMode === true) { channel.send(embed.setDescription(`${user} üyesinin ismi başarıyla \`${name}\` olarak değiştirildi. Bu üye daha önce bu isimlerle kayıt olmuş. \n\n ${user.guild.emojis.cache.get(ayar.emojis.yes)} Kişinini toplamda **${data.length}** isim kayıtı bulundu. \n ${isimler} \n\n Kişinin önceki isimlerine \`.isimler @kullancı/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.`)).sil(10); } else { channel.send(embed.setDescription(`${user} üyesine ${user.guild.roles.cache.get(ayar.roles.womanRoles[0])} rolü verildi.`)).sil(7); }
        if (ayar.guild.tagges.some(s => user.user.tag.toLowerCase().includes(s))) user.roles.add(ayar.roles.tagRole)
    }

    static fixname(member, isim, yaş) {
        let fixTag = `${ayar.guild.tagges.some(s => member.user.tag.toLowerCase().includes(s)) ? ayar.guild.tag : ayar.guild.defaultTag}`
        var name;
        if (yaş) name = `Wéis ${isim} | ${yaş}`
        if (!yaş) name = `Wéis ${isim}`
        return name;
    }
}



module.exports = { Register };
