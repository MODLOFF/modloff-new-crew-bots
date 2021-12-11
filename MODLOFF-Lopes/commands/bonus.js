const Command = require("../base/Command.js");
const Discord = require("discord.js")
const Database = require('../models/inviter.js');
class Bonus extends Command {
    constructor(client) {
        super(client, {
            name: "bonus",
            aliases: ["ekstra", "tip"]
        });
    }
    async run(message, args) {
        let izinli = ["798257622033367070", "859464687401959445", "859161090138701864", "803874557189947444", "464429065340977152"]
        if(!izinli.includes(message.author.id)) return
        let tokaci = message.mentions.members.first() || await this.client.üye(args[0], message.guild)
        let bonus = args[1];
        if(!tokaci || !bonus) return this.client.yolla("Geçerli bir sayı ve üye belirtmelisin. \`(.bonus @Passenger/ID +10/-10)\`", message.author, message.channel)
        Database.findOne({userid: tokaci.id}, (err, inviterData) => {
            if(!inviterData) {
                let newInviter = new Database({
                    userid: tokaci.id,
                    inviter: null,
                    isFake: null,
                    regular: 0,
                    fake: 0,
                    bonus: bonus,
                    leave: 0
                });
                newInviter.save().then(x => this.client.yolla("Belirtilen üyenin bonus davet sayısı **"+bonus+"** olarak ayarlandı!", message.author, message.channel))
            } else {
                eval(`inviterData.bonus = inviterData.bonus +${Number(bonus)}`);
                inviterData.save().then(x => this.client.yolla("Belirtilen üyenin bonus davet sayısına **"+bonus+"** davet eklendi.", message.author, message.channel))
            }
        })
    }
}

module.exports = Bonus;