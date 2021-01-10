const launchTime = new Date();

// Libs
const fs = require("fs");
const Discord = require("discord.js")
const chalk = require("chalk")
const commandProcessor = require("./utils/commandProcessor")
const db = require("./utils/database")
const SDC = require("@megavasiliy007/sdc-api");


// Config
const config = require("./config.json")

// Discord Client
const client = new Discord.Client()
client.commands = new Discord.Collection();
client.modules = {};

// SDC Client
const sdclient = new SDC("");


console.log(chalk.blue(fs.readFileSync("./Assets/banner.txt").toString() + "\n"));

require("./utils/commandsLoader")(client);

client.once('ready', () => {
    console.log(chalk.cyan(`[Boot Service] logged in to Discord as ${client.user.tag} [${client.user.id}]`));
    client.user.setActivity('Wildways', { type: 'LISTENING' });

    sdclient.setAutoPost(client)

    client.setInterval(async () => {
        for (let i in client.guilds.cache.map(guild => guild.id)) {
            try {
                let x = await db.getmute(`${i}`, "users_mute", [])
                x = x[0]
                if (!x || x.time <= 0) return
                const g = client.guilds.cache.get(x.id)
                let member = g.members.cache.get(x.uid)
                if (await db.get(`${g.id}`, "guilds_mute_roles", 0) === 0) return
                let role = g.roles.cache.get(await db.get(`${g.id}`, "guilds_mute_roles"))
                if (Date.now() >  x.time) {
                 db.unmute(`${g.id}`, "users_mute", x.uid, 0).then(
                     member.roles.remove(role.id)
                )}
                else return
            }
            catch (e) {
                // Какой нахуй ошибка? Нету никакой ошибка
                "";
            }
        }
    }, 2500);
})


client.on("message", async (message) => {
    await commandProcessor(message, client);
    for (let i of client.guilds.cache.map(guild => guild.id)) {
        try {
            const g = client.guilds.cache.get(i);
            let mutedRole = g.roles.cache.find(mR => mR.name === "Kioru_Muted");

            if (!await db.get(message.guild.id, "guilds_mute_roles",  0) || await db.get(message.guild.id, "guilds_mute_roles",  0) === 0) return
            let role = message.guild.roles.cache.get(await db.get(message.guild.id, "guilds_mute_roles"))

            if (!role) return
            if(message.member.roles.cache.has(`${role.id}`)) return message.delete();
            else return;
        }
        catch (e) {
            console.error(e)
        }
    }
});

client.on("warn", console.warn)
client.on("error", console.warn)

client.on("messageUpdate", async (_, newMsg) => {
    await commandProcessor(newMsg, client);
});

const launchedTime = new Date();

console.log(chalk.gray(`[Boot Service] Bot booted in ${launchedTime - launchTime}ms`));


require("./events/logs")(client)
require("./Services/Rating/MainService")(client)

require("./events/HelloByeEvent")(client)

client.login(config.token).then(() => {
    console.log(chalk.gray(`[Kioru Service] started and ready to go in ${new Date() - launchTime}ms`))
});

module.exports = client

const ti_pidor = require("./api/clientConstructor")
new ti_pidor(client)
