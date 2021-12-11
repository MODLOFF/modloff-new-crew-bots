const Command = require("../../base/Command.js");
const Permissions = require("../../Settings/Permissions.json");
const GuildRole = require("../../Settings/GuildRole.json");

class kynoote extends Command {
    constructor(client) {
        super(client, {
            name: "kynoote",
            aliases: ["kynoote"]
        });
    }

    async run(message, args, perm) {
        if (!message.member.roles.cache.has(Permissions.Ytalim) && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        if(!user) return this.client.yolla("Bir üye etiketle ve tekrardan dene!", message.author, message.channel)
        if(!user.roles.cache.has("915324694876520474")) {
            await this.client.yolla(`${user} kişisine <@&915324694876520474>,<@&915324694914281492>,<@&915324694876520472> rolleri verildi.`, message.author, message.channel)
            user.roles.add("915324694876520474")
			user.roles.add("915324694876520472")
			user.roles.add("915324694914281492")
          //  user.roles.add("913784197410357248")

        } 
    }
}

module.exports = kynoote;
