const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")

const root1 = require("discord.js");
const root2 = require("discord.js");
const root3 = require("discord.js");

const client1 = new root1.Client();
const client2 = new root2.Client();
const client3 = new root3.Client();

const ayarlar = require('./ayarlar.json');
const config = require('./root.json');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

client1.on("guildBanAdd", async function(guild, user) {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.cache.get(entry.executor.id);
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;   

  guild.members.ban(entry.executor.id, {reason: "Root System | İzinsiz kullanıcı yasaklama"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.defenderlog)
   if (!channel) return console.log('Ban Koruma Logu Yok!');

   const root = new Discord.MessageEmbed()
   .setColor(ayarlar.color)
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${yetkili.user} yetkilisi bir kullanıcıyı izinsiz yasakladığı için yetkiliyi yasakladım.\n\nYetkili: (${yetkili.user} - \`${yetkili.id}\`)\nKullanıcı: \`${user.tag}\` - \`${user.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucudan Bir Kullanıcı İzinsiz Yasaklandı!** \n**Yasaklıyan Ve Yasaklanan Kişilerin Bilgileri** \n**Yetkilinin Adı :** \`\`${yetkili.user.tag}\`\` **Yetkilinin İdsi :** \`\`${yetkili.id}\`\`\n**Kullanıcın Adı :** \`\`${user.tag}\`\` **Kullanıcının İdsi :** \`\`${user.id}\`\``).catch(e => { })	
});

client1.on("guildMemberRemove", async kickhammer => {
  const guild = kickhammer.guild;
  const entry = await guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry.action == `MEMBER_KICK`) {
  let yetkili = await guild.members.cache.get(entry.executor.id);
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;    

  kickhammer.guild.members.ban(yetkili.id, {reason: "Root System | izinsiz kullanıcı Kickleme!"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Kick Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
    .setColor(ayarlar.color)
    .setAuthor(kickhammer.guild.name, kickhammer.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} yetkilisi izinsiz üye kickledi ve yetkili yasaklandı.\n\nYetkili: (${yetkili.user} - \`${yetkili.id}\`)\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucudan Bir Kullanıcı İzinsiz Kicklendi!** \n**Kickleyen Kişinin Bilgileri** \n**Yetkilinin Adı :** \`\`${yetkili.user.tag}\`\` **Yetkilinin İdsi :** \`\`${yetkili.id}\`\``).catch(e => { })	
}});

client1.on("guildMemberAdd", async member => {
const entry = await member.guild
   .fetchAuditLogs({ type: "BOT_ADD" })
   .then(audit => audit.entries.first());
  const xd = entry.executor;
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if (member.user.bot) {
  member.guild.roles.cache.forEach(async function(root) {
  if (root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});

  member.guild.members.ban(entry.executor.id, {reason: "Root System | İzinsiz Bot Ekleme!"}).catch(e => { })	
  member.guild.members.ban(member.id, {reason: "Root System | Bot Koruma Sistemi!"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Bot Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} üyesi izinsiz sunucuya bot ekledi ve yetkiliyi banlayıp, eklenen botu banladım, tüm yetkileri kapattım.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nBot: ${member.user} - \`${member.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucuya Bir Bot Eklendi! Eklenen Botun Bilgileri Ve Ekliyen Kişinin Bilgileri :** \n**Botun Adı :** \`\`${member.user.tag}\`\` **Botun İdsi :** \`\`${member.id}\`\` \n**Kullanıcı Adı :** \`\`${xd.tag}\`\` **Kullanıcı İdsi :** \`\`${xd.id}\`\``).catch(e => { })	
}});

client1.on('guildUpdate', async (oldGuild, newGuild) => {
  const request = require('request');
  const moment = require('moment');
  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if(!entry.executor || entry.executor.id === client1.user.id || Date.now()-entry.createdTimestamp > 10000) return;

  moment.locale('tr');
  if(newGuild.vanityURLCode === null) return;
  if(oldGuild.vanityURLCode === newGuild.vanityURLCode) return;                                              
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  newGuild.roles.cache.forEach(async function(root) {
  if (root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});

  newGuild.members.ban(entry.executor.id, {reason: "Root System | URL Koruma Sistemi!"}).catch(e => { })	

  let channel = client1.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('URL Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} yetkilisi izinsiz sunucu URL'sini değiştirdi ve sunucudan yasaklayıp, URL'yi geri alıp, tüm yetkileri kapattım.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
  client1.users.cache.get(ayarlar.sahip).send(`**Sunucu URL'si değiştirildi! Değiştiren kişinin bilgileri :**\n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdisi :** \`\`${entry.executor.id}\`\``).catch(e => { })	
  request({  
    method: 'PATCH',
  url: `https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`,
    body: {
      code: ayarlar.url
    },
    json: true,
    headers: {
      "Authorization": `Bot ${ayarlar.token}`
    }
  }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
});

client1.on("guildUpdate", async (oldGuild, newGuild) => {
  let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));

  newGuild.roles.cache.forEach(async function(root) {
  if (root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});

  newGuild.members.ban(entry.executor.id, { reason: `Root System | Sunucuyu izinsiz güncellemek.` }).catch(e => { })	
  const moment = require('moment');
  moment.locale('tr');

  let channel = client1.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Sunucu Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} yetkilisi izinsiz sunucu ayarlarıyla oynadı ve sunucudan yasaklanıp, tüm yetkileri kapattım.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return client1.users.cache.get(ayarlar.sahip).send(`**Sunucu ayarlarıyla Oynandı! Oynıyan Kişinin Bilgileri :**\n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\``).catch(e => { })	
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client2.on("roleDelete", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  role.guild.roles.cache.forEach(async function(root) {
  if(root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});  

  role.guild.members.ban(entry.executor.id, { reason: `Root System | İzinsiz rol silme!` }).catch(e => { })	

  let channel = client2.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(role.guild.name, role.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} yetkilisi izinsiz rol sildi ve yetkiliyi yasaklayıp, tüm yetkileri kapattım.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nRol: \`${role.name}\` - \`${role.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return client2.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol silindi! silen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\`\n**Rol Adı :** \`\`${role.name}\`\` **Rol İdsi :** \`\`${role.id}\`\``).catch(e => { })	
});

client2.on("roleCreate", async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  role.delete({ reason: "Root System | Rol Koruma Sistemi" });
  const uyecik = role.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => { })

  let channel = client2.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Açma Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(role.guild.name, role.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} üyesi izinsiz rol açtı ve yetkiliyi karantina atıp, rolü sildim.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nRol: \`${role.name}\` - \`${role.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return client2.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol açıldı! açan kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\``).catch(e => { })	
});

client2.on("roleUpdate", async (oldRole, newRole) => {
  let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
    newRole.setPermissions(oldRole.permissions);
    newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
  };
  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable
  });

  newRole.guild.roles.cache.forEach(async function(root) {
  if(root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});  

  newRole.guild.members.ban(entry.executor.id, { reason: `Root System | İzinsiz Rol Güncelleme!` }).catch(e => { })	

  let channel = client2.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Günceleme Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} üyesi izinsiz rol güncelledi ve yetkiliyi yasaklayıp, tüm yetkileri kapattım.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nRol: \`${oldRole.name}\` - \`${oldRole.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return client2.users.cache.get(ayarlar.sahip).send(`**Sunucuda rol güncellendi! Günceliyen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\`\n**Rol Adı :**\`\`${oldRole.name}\`\` **Rol İdsi :** \`\`${oldRole.id}\`\``).catch(e => { })	
});

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
client2.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
  let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  const uyecik = newMember.guild.members.cache.get(entry.executor.id);
  if(yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
  newMember.roles.set(oldMember.roles.cache.map(r => r.id));
    uyecik.guild.members.ban(entry.executor.id, { reason: `Root System | İzinsiz Yönetici Verme!` }).catch(e => { })	


  let channel = client2.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Verme Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} üyesi izinsiz yönetici rolü verdi ve üyeden rolü alıp, rolü veren kişiyi banladım.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nKullanıcı: ${newMember.user} - \`${newMember.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
        };
      };
    });

client2.on("guildMemberUpdate", async (oldMember, newMember) => {
  let guild = newMember.guild;
  if(oldMember.nickname != newMember.nickname){
  let logs = await guild.fetchAuditLogs({limit: 5, type:"MEMBER_UPDATE"}).then(e => e.entries.sort((x, y) => y.createdTimestamp - x.createdTimestamp));
  let log = logs.find(e => ((Date.now() - e.createdTimestamp) / (1000)) < 5);
  if(!log) return;
  if(oldMember.user.id === log.executor.id) return
  if(config.bots.includes(log.executor.id)) return;
  if(config.owners.includes(log.executor.id)) return;
  if(config.guvenlid.includes(log.executor.id)) return;

  const uyecik = newMember.guild.members.cache.get(log.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => {})
    
  let channel = client3.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('İsim Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setThumbnail(log.executor.avatarURL({ dynamic: true }))
.setDescription(`${log.executor} üyesi izinsiz isim güncelledi ve kullanıcıyı karantina attım.\n\nYetkili: (${log.executor} - \`${log.executor.id}\`)\nİsim: \`${oldMember.nickname}\` - \`${newMember.nickname}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(e => { })	
return;
      }
    });
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client3.on("channelDelete", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  channel.guild.roles.cache.forEach(async function(root) {
  if(root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});

  channel.guild.members.ban(entry.executor.id, { reason: `Root System | İzinsiz Kanal Silme!` }).catch(e => { })	
  await channel.clone({ reason: "Root System | Kanal Korum Sistemi!" }).then(async kanal => {
  if(channel.parentID != null) await kanal.setParent(channel.parentID);
  await kanal.setPosition(channel.position);
  if(channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));});

  let channel2 = client3.channels.cache.get(ayarlar.defenderlog)
  if (!channel2) return console.log('Kanal Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(channel.guild.name, channel.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} üyesi izinsiz kanal sildi ve kullanıcıyı yasaklayıp, rollerdeki tüm yetkileri kapattım , kanalı tekrar açtım.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nKanal: \`${channel.name}\` - \`${channel.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
channel2.send(`@here`, {embed: root}).catch(e => { })
return client3.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal silindi! Silen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\`\n**Kanal Adı :**\`\`${channel.name}\`\` **Kanal İdsi :** \`\`${channel.id}\`\``).catch(e => { })
});

client3.on("channelCreate", async channel => {
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  channel.guild.roles.cache.forEach(async function(root) {
  if(root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});

  channel.guild.members.ban(entry.executor.id, { reason: `Root System | İzinsiz Kanal Oluşturma!` }).catch(e => { })
  channel.delete({reason: "Root System | Kanal Koruma Sistemi!"}).catch(e => { })

  let channel2 = client3.channels.cache.get(ayarlar.defenderlog)
  if (!channel2) return console.log('Kanal Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(channel.guild.name, channel.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true })) 
.setDescription(`${entry.executor} üyesi izinsiz kanal oluşturuldu ve kullanıcıyı yasaklayıp, kanalı sildim.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nKanal: \`${channel.name}\` - \`${channel.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
channel2.send(`@here`, {embed: root}).catch(e => { })
return client3.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal oluşturuldu! oluşturan kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\`\` **Kullanıcı İdsi :** \`\`${entry.executor.id}\`\``).catch(e => { })
});

client3.on("channelUpdate", async (oldChannel, newChannel) => {
  let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000 || !newChannel.guild.channels.cache.has(newChannel.id)) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  if(newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if(newChannel.type === "category") {
    newChannel.edit({ name: oldChannel.name,});
  } else if (newChannel.type === "text") {newChannel.edit({ name: oldChannel.name, topic: oldChannel.topic, nsfw: oldChannel.nsfw, rateLimitPerUser: oldChannel.rateLimitPerUser });
  } else if (newChannel.type === "voice") {newChannel.edit({ name: oldChannel.name, bitrate: oldChannel.bitrate, userLimit: oldChannel.userLimit, });};
  oldChannel.permissionOverwrites.forEach(perm => {let thisPermOverwrites = {}; perm.allow.toArray().forEach(p => { thisPermOverwrites[p] = true;}); perm.deny.toArray().forEach(p => {thisPermOverwrites[p] = false; });
  newChannel.createOverwrite(perm.id, thisPermOverwrites);});

  newChannel.guild.cache.roles.cache.forEach(async function(root) {
  if(root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});

  newChannel.guild.members.ban(member.id, { reason: `Root System | İzinsiz Kanal Güncellemek!` }).catch(e => { })

  let channel = client3.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Kanal Günceleme Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(channel.guild.name, channel.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true })) 
.setDescription(`${entry.executor} üyesi izinsiz kanal güncelledi ve kullanıcıyı karantina atıp, kanalı eski haline getirdim.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nKanal: \`${oldChannel.name}\` - \`${channel.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
channel.send(`@here`, {embed: root}).catch(e => { })
return client3.users.cache.get(ayarlar.sahip).send(`**Sunucuda kanal güncellendi! Güncelliyen kişinin bilgileri :** \n**Kullanıcı Adı :** \`\`${entry.executor.tag}\` **Kullanıcı idsi :** \`${entry.executor.id}\`\`\n**Kanal İdsi :** \`\`${oldChannel.name}\`\` **Kanal İdsi :** \`\`${oldChannel.id}\`\``).catch(e => { })
});


client3.on("webhookUpdate", async (channel) => {
  const entry = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  const webhooks = await channel.fetchWebhooks();
  await webhooks.map(x => x.delete({reason: "Root System | Webhook Silindi!"}))
  channel.guild.members.ban(entry.executor.id, {reason: "Root System | İzinsiz Webhook Açmak!"})

  channel.guild.roles.cache.forEach(async function(root) {
  if(root.permissions.has("ADMINISTRATOR") || root.permissions.has("BAN_MEMBERS") || root.permissions.has("MANAGE_GUILD") || root.permissions.has("KICK_MEMBERS") || root.permissions.has("MANAGE_ROLES") || root.permissions.has("MANAGE_CHANNELS")) {
    root.setPermissions(0).catch(err =>{});}});

  channel.guild.channels.cache.get(ayarlar.defenderlog).send(`${entry.executor} üyesi tarafından sunucuda izinsiz webhook açıldı, webhook silinip ve banlandı.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  client3.users.cache.get(ayarlar.sahip).send(`**${entry.executor} tarafından sunucuda izinsiz webhook açıldı, webhook silinip ve banlandı!`)
return;
});

client3.on("emojiDelete", async (emoji, message) => {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
  const uyecik = emoji.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => { })

  let channel = client3.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Emoji Silme Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
    .setColor(ayarlar.color)
    .setAuthor(emoji.guild.name, emoji.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} üyesi izinsiz emoji sildi ve kullanıcıyı karantina atıp, emojiyi yeniden yükledim.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nEmoji: \`${emoji.name}\` - \`${emoji.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(err => { })
return;
});

client3.on("emojiCreate", async (emoji, message) => {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_CREATE" }).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  emoji.delete({reason: "Emoji Koruma Sistemi!"});
  const uyecik = emoji.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => { })

  let channel = client3.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Emoji Yükleme Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(emoji.guild.name, emoji.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`${entry.executor} üyesi izinsiz emoji yükledi ve kullanıcıyı karantina atıp, emojiyi sildim.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nEmoji: \`${emoji.name}\` - \`${emoji.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(err => { })
return;
});

client3.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  if(oldEmoji === newEmoji) return;
  const entry = await oldEmoji.guild.fetchAuditLogs({ type: "EMOJI_UPDATE" }).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  await newEmoji.setName(oldEmoji.name);
  const uyecik = oldEmoji.guild.members.cache.get(entry.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => {})

  let channel = client3.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Emoji Güncelleme Koruma Logu Yok!');
  const root = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setAuthor(oldEmoji.guild.name, oldEmoji.guild.iconURL({ dynamic: true }))
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`${entry.executor} üyesi izinsiz emoji güncelledi ve kullanıcıyı karantina atıp, emojiyi eski haline getirdim.\n\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nEmoji: \`${oldEmoji.name}\` - \`${oldEmoji.id}\`\n\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: root}).catch(err => { })
return;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client1.on("ready", () => {
    client1.channels.cache.get(ayarlar.guardbotvoice).join(); //SES KANALI İDSİ GİRİN!
  });

client1.on("ready", async () => {
console.log(`${client1.user.username} ismi ile giriş yapıldı! Guard I Online`);
client1.user.setPresence({ activity: { name: ayarlar.botdurum }, status: ayarlar.status });
});

client1.login(ayarlar.guardbot1).catch(err => {
console.error('Guard I Giriş Yapamadı!')
console.error(err.message)
});

    client1.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client1.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });

////
client2.on("ready", () => {
    client2.channels.cache.get(ayarlar.guardbotvoice).join(); //SES KANALI İDSİ GİRİN!
  });

client2.on("ready", async () => {
console.log(`${client2.user.username} ismi ile giriş yapıldı! Guard II Online`);
client2.user.setPresence({ activity: { name: ayarlar.botdurum }, status: ayarlar.status });
});

client2.login(ayarlar.guardbot2).catch(err => {
console.error('Guard II Giriş Yapamadı!')
console.error(err.message)
});

    client2.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client2.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });

///
client3.on("ready", () => {
    client3.channels.cache.get(ayarlar.guardbotvoice).join(); //SES KANALI İDSİ GİRİN!
  });

client3.on("ready", async () => {
console.log(`${client3.user.username} ismi ile giriş yapıldı! Guard III Online`);
client3.user.setPresence({ activity: { name: ayarlar.botdurum }, status: ayarlar.status });
});   

client3.login(ayarlar.guardbot3).catch(err => {
console.error('Guard III Giriş Yapamadı!')
console.error(err.message)
});

    client3.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client3.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client1.on('warn', m => console.log(`[WARN - 1] - ${m}`));
client1.on('error', m => console.log(`[ERROR - 1] - ${m}`));
client2.on('warn', m => console.log(`[WARN - 2] - ${m}`));
client2.on('error', m => console.log(`[ERROR - 2] - ${m}`));
client3.on('warn', m => console.log(`[WARN - 3] - ${m}`));
client3.on('error', m => console.log(`[ERROR - 3] - ${m}`));
process.on('uncaughtException', error => console.log(`[ERROR] - ${error}`));
process.on('unhandledRejection', (err) => console.log(`[ERROR] - ${err}`));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
client1.on("roleDelete", role => {
  client1.channels.cache.get(ayarlar.defenderlog).send("Silinen Rol ID: `" + role.id + "`");
  client1.channels.cache.get(ayarlar.defenderlog).send("Silinen Rol İsim: `" + role.name + "`");
});

client1.on("channelDelete", channel => {
  client1.channels.cache.get(ayarlar.defenderlog).send("Silinen Kanal ID: `" + channel.id + "`");
  client1.channels.cache.get(ayarlar.defenderlog).send("Silinen Kanal İsim: `" + channel.name + "`");
});
