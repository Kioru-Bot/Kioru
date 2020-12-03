const db = require("../utils/database")

module.exports = client => {
    client.setInterval(async () => {
        for (let i in client.guilds) {
            for (let x in await db.get(`${i.id}`, "users_mute", [])) {
                console.log(x)
            }
        }
    }, 5000);
}

// if(Date.now() > time) {
//     member.removeRole(mutedRole);
//     delete bot.muted[i];