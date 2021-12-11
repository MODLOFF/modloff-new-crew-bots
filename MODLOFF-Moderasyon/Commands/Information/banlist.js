const Command = require("../../base/Command.js");
const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const db = require("../../models/cantUnBan.js")
class Cezalandırmalar extends Command {
    constructor(client) {
        super(client, {
            name: "banlist",
            aliases: ["banliste", "banlılar"]
        });
    }

    async run(message, args, client) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return
        message.guild.fetchBans(true).then(banned => {
            let list = banned.map(user => `${user.user.id} | ${user.user.tag}`).join('\n');
            message.channel.send(`${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcı bulunmakta.`, { code: "js", split: true })

        })
    }
}



module.exports = Cezalandırmalar;
