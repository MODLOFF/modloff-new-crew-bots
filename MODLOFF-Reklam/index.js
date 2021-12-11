const {Client} = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const acarkre = require('acarkre');
acarkre(client, {
    konsolBilgi: true,
    küfürEngel: false,
    reklamEngel: true,
    uyarıMesajı: true, 
    izinliKanallar: [],
    izinliRoller: [],
    kufurUyariMesaj: "Birdaha küfür etmemelisin aksi taktirde ceza alacaksın.", 
    reklamUyariMesaj: "Birdaha reklam yapmamalısın aksi taktirde ceza alacaksın."
});
  client.login("ODU4OTkyODQ3OTQwMDkxOTI0.YNmNbg.EvQlANxufI42zASuERZuZij7SGw");
