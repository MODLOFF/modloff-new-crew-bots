const Command = require("../../base/Command.js");
const Discord = require("discord.js");

class Nerede extends Command {
    constructor(client) {
        super(client, {
            name: "nerede",
            aliases: ["n"]
        });
    }

    async run(message, args, data) {
    let Root;
    var Rootnn = message.mentions.members.first();
    if (Rootnn) {
        Root = Rootnn;
    } else {
        Root = message.guild.members.cache.get(args[0]);
    }
    
    if (!Root) return this.client.yolla(`Bir üye etiketle ve tekrardan dene!`, message.author, message.channel);
    let Rootn = ``;
    if (!Root.voice.channel) {
        Root = `Belirtilen kullanıcı hiçbir kanalda bulunmamaktadır.`;
        
    } else {
        let süresi = this.client.channelTime.get(Root.id) || {channel: Root.voice.channel.name, time: "Yok"}
        let selfMt = Root.voice.selfMute ? "**Mikrofonu: Kapalı**" : "**Mikrofonu: Açık**";
        let selfDf = Root.voice.selfDeaf ? "**Kulaklığı: Kapalı**" : "**Kulaklığı: Açık**";
        let asd = await Root.voice.channel.createInvite({maxUses: 1});
        Root = "" + Root.voice.channel.name + "" + " ("+Root.voice.channel.members.size +"/"+ Root.voice.channel.userLimit+")" + " kanalında. Kanala gitmek için [tıklaman](https://discord.gg/"+asd.code+") yeterli." + "\n```" +await this.client.turkishDate(Date.now() - süresi.time)+" önce giriş yapmış. ```"+ "\n "+ selfMt +"" + ", "+ selfDf +"";

    };
    let xxx = message.guild.channels.cache.get(Root.lastMessageChannelID);
    if (!xxx) {
        xxx = `Bulunamadı`;
    };
    const embed = new Discord.MessageEmbed().setAuthor(Root.user.tag, Root.user.avatarURL({ dynamic: true }))
    .setDescription(`${Root} kişisi #${Root}\n\nEn son yazdığı kanal: ${xxx}`)
    message.channel.send(embed);

}

}
module.exports = Nerede;
