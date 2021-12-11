const Command = require("../../base/Command.js");
const Permissions = require("../../Settings/Permissions.json");
const GuildRole = require("../../Settings/GuildRole.json");

class kynoote extends Command {
    constructor(client) {
        super(client, {
            name: "star",
            aliases: ["star"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has(Permissions.Ytalim) && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Bir üye etiketle ve tekrardan dene!", message.author, message.channel)
        if(!user.roles.cache.has("915324694876520474")) {
            await this.client.yolla(`${user} kişisine <@&915324694914281493>,<@&915324694914281493>,<@&915324694876520472>,<@&915324694876520473> rolleri verildi.`, message.author, message.channel)
            user.roles.add("915324694914281493")
			user.roles.add("915324694876520472")
			user.roles.add("915324694914281493")
            user.roles.add("915324694876520473")

        } 
    }
}

module.exports = kynoote;
