const Discord = require("discord.js")
const client = new Discord.Client();
const ayar = require("./settings.js")
const fs = require("fs");
require('./util/Loader.js')(client);

const mongoose = require('mongoose');
mongoose.connect(ayar.bot.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(m => setTimeout(() => { console.log('Databaseyi sikerek bağlandım!') }, 3000)).catch(err => setTimeout(() => { console.log('Database bağlanamadı!!') }, 3000));
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./Commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./Commands/${f}`);
        console.log(`${props.config.name} komutu yüklendi.`);
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name);
        });
    });
})



client.on("message", function (msg) {
	// if message begins with "ping"
	if (msg.content.indexOf(".tag") === 0) {
		// send a message to the channel the ping message was sent in.
		msg.channel.send("İsim Taglarımız: `Wéis, Weis, ᵂ`\nEtiket Tagımız `#1998`");

		// alert the console
		console.log("pong-ed " + msg.author.username);
	}
});

client.on("message", function (msg) {
	// if message begins with "ping"
	if (msg.content.indexOf("!tag") === 0) {
		// send a message to the channel the ping message was sent in.
		msg.channel.send("İsim Taglarımız: `Wéis, Weis, ᵂ`\nEtiket Tagımız `#1998`");

		// alert the console
		console.log("pong-ed " + msg.author.username);
	}
});

client.on("guildMemberAdd", member => {
    let sunucuid = "915324694503243847"; 
    let tag = "Wéis";
    let rol = "915324694876520470"; 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get("915324698932428818").send(tagalma)
  }
  })

  client.on("guildMemberAdd", member => {
    let sunucuid = "915324694503243847"; 
    let tag = "wéis";
    let rol = "915324694876520470"; 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get("915324698932428818").send(tagalma)
  }
  })

  client.on("guildMemberAdd", member => {
    let sunucuid = "915324694503243847"; 
    let tag = "Wéis";
    let rol = "915324694876520470"; 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get("915324698932428818").send(tagalma)
  }
  })

  client.on("guildMemberAdd", member => {
    let sunucuid = "915324694503243847"; 
    let tag = "weis";
    let rol = "915324694876520470"; 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get("915324698932428818").send(tagalma)
  }
  })

  client.on("guildMemberAdd", member => {
    let sunucuid = "915324694503243847"; 
    let tag = "Weis";
    let rol = "915324694876520470"; 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get("915324698932428818").send(tagalma)
  }
  })
  
  client.on("guildMemberAdd", member => {
    let sunucuid = "915324694503243847"; 
    let tag = "ᵂ";
    let rol = "915324694876520470"; 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get("915324698932428818").send(tagalma)
  }
  })
  
  
      //////-------etiket girişte-------/////
  
        
    client.on("guildMemberAdd", member => {
        let sunucuid = "915324694503243847"; 
        let tag = "1998";
      let rol = "915324694876520470"; 
    if(member.user.discriminator.includes(tag)){
    member.roles.add(rol)
      const tagalma = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
          .setTimestamp()
          client.channels.cache.get("915324698932428818").send(tagalma)
    }
    })


    client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
        let tag1 = "Wéis"; 
        let tag2 = "Weis"; 
        let tag3 = "ᵂ"; 
        const roleID = "915324694876520470"; 
        const guildID = "915324694503243847"; 
        const chat = "915324695748948049"; 
        const log2 = "915324698932428818"; 
        const etiket = "1998"; 
        const unregister = "915324694838784026";
        const guild = client.guilds.cache.get(guildID)
        const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
        const member = guild.members.cache.get(newUser.id)
        if (newUser.username !== oldUser.username) {
            if (oldUser.username.includes(tag1) && !newUser.username.includes(tag1)) {
				member.roles.set([unregister])
                member.roles.remove(roleID)
                member.setNickname(`Wéis İsim | Yaş`)

                client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **${tag1}** sildi \n \`Alınan Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            } else if (!oldUser.username.includes(tag1) && newUser.username.includes(tag1)) {
                member.roles.add(roleID)
                client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
                client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **${tag1}** tagını aldı \n \`Verilen Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            }
        }
        if (newUser.username !== oldUser.username) {
            if (oldUser.username.includes(tag2) && !newUser.username.includes(tag2)) {
				member.roles.set([unregister])
                member.roles.remove(roleID)
                member.setNickname(`Wéis İsim | Yaş`)

                client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **${tag2}** sildi \n \`Alınan Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            } else if (!oldUser.username.includes(tag2) && newUser.username.includes(tag2)) {
                member.roles.add(roleID)
                client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
                client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **${tag2}** tagını aldı \n \`Verilen Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            }
        }
        if (newUser.username !== oldUser.username) {
            if (oldUser.username.includes(tag3) && !newUser.username.includes(tag3)) {
				member.roles.set([unregister])
                member.roles.remove(roleID)
                member.setNickname(`Wéis İsim | Yaş`)

                client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **${tag3}** sildi \n \`Alınan Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            } else if (!oldUser.username.includes(tag3) && newUser.username.includes(tag3)) {
                member.roles.add(roleID)
                client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
                client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **${tag3}** tagını aldı \n \`Verilen Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            }
        }
       if (newUser.discriminator !== oldUser.discriminator) {
            if (oldUser.discriminator == `${etiket}` && newUser.discriminator !== `${etiket}`) {
				member.roles.set([unregister])
                member.setNickname(`Wéis İsim | Yaş`)
                client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **#${etiket}** sildi \n \`Alınan Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            } else if (oldUser.discriminator !== `${etiket}` && newUser.discriminator == `${etiket}`) {
                member.roles.add(roleID)
                client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **#${etiket}** tagını aldı \n \`Verilen Rol:\` \`Family of Wéis\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
                client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
            }
        }
      
      }) 

client.login(ayar.bot.botToken).catch(err => { console.log('Bota giriş yapılırken başarısız olundu!!') })