const moment = require("moment")
const Log = require("../Settings/Log.json")
const Permissions = require("../Settings/Permissions.json")
const Others = require("../Settings/Others.json")
const Bot = require("../Settings/Bot")
const Discord = require("discord.js")
const ms = require("ms")
moment.locale("tr")
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {

    const data = {};
    if (message.author.bot) return;


    var random = [
      "Oha bu çocuk Türk müüüüüüüüüüüü?",
      "dur beynimi çıkarayım, eşit şartlarda konuşalım",
      "gitsen tek kaybım mal kaybı olur hahaha",
      "bunun adı kalp güzelim. Tersten okuduğun gibi plak değil ki sürekli sende takılı kalsın.",
      "kafamı yaşasan kafana sıkarsın",
      "sanırım seni getiren leyleğin bıraktığı izdi, kuş beyinli olman.",
      "senin için savaşırdım ama verimsiz toprakları feth etmeye gerek yok",
      "birbirimizi çift görmem için kaç duble daha içmeliyim?",
      "azrail bile ayağıma geliyor ne bu tripler?",
      "Buralarda yeniyim de kalbinin yolunu tarif eder misin?",
      "Nasıl yani şimdi sen gerçek misin?",
      "Bunca zaman neredeydin?",
      "seni seviyorum.",
      "Allah seni yaratmış fakat takip etmiyor sanırım, bu tip ne?",
      "sarılalım mı?",
      "benimle evlenir misin?",
      "azıcık beynini kullan diyeceğim fakat seni zor durumda bırakmak istemiyorum.",
      "akıllara zarar bi mükemmelliğin var",
      "attan indiysek leopar falan gelmiştir ben anlamam eşekten",
      "dedikodu yapalım mı?",
      "iyi ki varsın 💕",
      "şu üstteki aptik ne anlatıyor ya?",
      "o kadar haklısın ki... seni öpesim var",
      "öpşuelimi? çabuk!",
      "yavrum hepsi senin mi?",
      "bi alo de gelmezsem gençliğim solsun.",
      "çok şişkosun.",
      "sevgilim var yazma?",
      "zenginsen evlenelim mi?",
      "halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
      "o kadar çok meslek türü varken neden şerefsizlik tatlım?",
      "bu güne aynayı öperek başladım",
      "çok bereketli topraklarımız yok mu? her türlü şerefsiz yetişiyor",
      "taş gibisin!",
      "kalitesizliğinin kokusu geldi...",
      "Şey gözlerin çok güzelmiş tanışalım mı ?",
      "Kalbinin yolunu gösterir misin...",
      "Corona olsan bile sana sarılırdım",
      "Oha sen gerçek misin ?",
      "kahveyi sütsüz seni tereddütsüz seviyorum",
      "senin hava attığın yerde benim rüzgarım esiyor",
      "çok güzel bi tablo gördüm tam alacaktım ama aynaymış...",
      "canım haddin hariç her şeyi biliyorsun",
      "havalar alev gibii, tatile serin bi yerlere gitsene mesela morg?",
      "tavla oynayalım ama sen beni tavla",
      "hava sıcak değil aşkından yanıyorum",
      "konum atta belamızı bulalım bebeğim",
      "üşüdüysen sana abayı yakayım mı?",
      "gel biraz otur yanıma ölünce gidersin",
      "sütüm yarım yağlı mutluluğum sana bağlı",
      "eğer ahtapot olsaydım üç kalbimi de sana verirdim",
      "salağa yatarken uyuya falan mı kaldın?",
      "meleksin ama canımı alıyorsun yoksa Azrailim misin?",
      "ben varya fay hattı olsam kesin daha az kırılırdım",
      "iban at hayallerimi yollayayım harcarsın",
      "ankarada deniz sende karakter",
      "sana hayatım diyorum çünkü o kadar kötüsün",
      "görüşelim mi? mahşer yeri uygun mu?",
      "eşekten yarış atı olmaz ama sen genede koş spor yaparsın",
      "Anlatsana biraz neden bu kadar mükemmelsin?",
      "Nasılsın diye sorma bebeğim, sana göreyim kıpss",
      "Kakaolu sütsün seni sevmeyen ölsün",
      "Ya sen hep böyle hoşuma mı gideceksin ?",
      "Çikolatalı keksin bu alemde teksin",
      "8 milyar gülüş varken seninki favorim",
      "dalin gibi kokuyorsun",
      "seni her gün görenlerin şansından istiyorum",
      "en iyisine layıksın yani bana hıh",
      "ateşimin çıkma sebebi corona değil, sensin",
      "yemeğimi yedim şimdi seni yeme vakti",
      "beni biraz takar mısın?",
      "aklın başına gelir ama ben sana gelmem",
      "sen beni birde sevgilinken gör",
      "naber lan karakter kanseri",
      "soğuk davranacaksan üzerime bir şey alayım?",
      "sana beyin alacam",
      "Allah belanı vermiyor artık ben bir şey yapacağım",
      "artık benimsin",
      "canın yandı mı? cenneten düşerken?",
      "seni mumla ararken elektrikler geldi",
      "burnunda sümük var",
      "Suyun içinde klorür senin kalbinde bir ömür...",
      "Çok tatlı olmayı bırak artık... Kalbim başa çıkamıyor !",
      "Kalbini dinle dediklerinde seni dinleyesim geliyor",
      "Polisi arıyorum çünkü bu kadar tatlı olman yasadışı !",
      "Ölüm ani dünya fani bi kere sevsen nolur ki yani ?",
      "Bana yüzünü dönme gece oluyor sanıyorum.",
      "Güneş aya ben sana tutuldum.",
      "Sana gemi alalım dümende bir numarasın.",
      "AÇILIN DÜNYANIN 8.HARİKASI GELDİ !",
      "Ben küçücük bi botum ama sana kocaman sarılırım",
      "Kafam çok güzel çünkü içinde sen varsın.",
      "Alnın güzelmiş yazısı olabilir miyim ?",
      "Gülüşün şimşek içermiyiz birer milkşeyk ?"
    ]
    if (message.channel.id == Log.General_Chat) {
      var randomlaananaısikerim =
        random[Math.floor(Math.random() * random.length)];
      let no = Math.floor(Math.random() * 130)
      if (no == 98) {
        message.channel.send("<@" + message.author.id + "> " + randomlaananaısikerim + " ");
      }

    }

    let userData = await this.client.findOrCreateUser({ id: message.author.id });
    data.userData = userData;

    let afkReason = data.userData.sebep;
    if (afkReason) {
      let ha = moment(data.userData.tarih).fromNow()
      message.channel.send("<@" + message.author.id + "> AFK modundan başarıyla çıkış yaptın, " + ha + " AFK olmuştun.").then(msg => { msg.delete({ timeout: 7000 }) })
      let nicke = message.member.displayName.replace("[AFK]", "")
      message.member.setNickname(nicke)
      data.userData.sebep = null;
      data.userData.tarih = 0
      await data.userData.save();
    }
    message.mentions.users.forEach(async (u) => {
      let userData = await this.client.findOrCreateUser({ id: u.id });
      let ha = moment(userData.tarih).fromNow()
      if (userData.sebep) {
        message.channel.send("<@" + userData.id + "> " + ha + " AFK moduna geçti. Sebep: " + userData.sebep + " ").then(msg => { msg.delete({ timeout: 7000 }) })
      }
    });

    if (message.guild && !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES"))
      return;

    let prefikslerim = [".","Root","luna"];
    let Root = false;
    for (const içindeki of prefikslerim) {
      if (message.content.startsWith(içindeki)) Root = içindeki;
    }

    if (!Root) return;

    const args = message.content
      .slice(Root.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);



    const client = this.client

    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly) return;

    if(message.channel.id == Log.General_Chat && !message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission("VIEW_AUDIT_LOG")) return message.react(Others.Emojis.Red_Tick)

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    if (this.client.blockedFromCommand.includes(message.author.id)) return

    let owners = [Permissions.Sahip]

    if (!owners.includes(message.author.id)) {

      let blockArr = this.client.commandBlock.get(message.author.id) || []

      let datax = {
        içerik: message.content,
        kanal: message.channel.name,
        komut: cmd.help.name
      }

      blockArr.push(datax)

      this.client.commandBlock.set(message.author.id, blockArr)

      if (blockArr.length == 9) {
        message.channel.send(`${message.author}` + "```⛔ Komut kullanımın kötüye kullandığın için engellendi.Açtırmak için " + this.client.appInfo.owner.tag + " kişisine ulaşman gerekiyor...```")
        message.channel.send(`**${message.author.tag}** - ${message.author}(\`${message.author.id}\`) komut engeli yedi.Komut kullanım özeti:\n\`\`\`${blockArr.map(x => x.içerik).join("\n")}\nKullandığı komutlar: ${blockArr.map(x => x.komut).join(",")}\nKullandığı kanallar: ${blockArr.map(x => x.kanal).join(",")}\`\`\``)
        this.client.blockedFromCommand.push(message.author.id)
      }

      setTimeout(() => { if (this.client.commandBlock.has(message.author.id)) { this.client.commandBlock.delete(message.author.id) } }, ms("1m"))
    }
    this.client.logger.log(`${message.author.tag} (${message.author.id}) komut kullandı "${cmd.help.name}" kullandığı kanal ${message.channel.name}`, "cmd");
    cmd.run(message, args, data);
 
    this.client.channels.cache.get(Log.Komut.Log).send(new Discord.MessageEmbed().setColor("RANDOM").setTimestamp().setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`${message.author.tag} - (${message.author.id}) komut kullandı "${cmd.help.name}" kullandığı kanal ${message.channel.name} - ${message.channel.id}`))
 }
};
