const launchTime = new Date();

// Libs
const fs = require("fs");
const Discord = require("discord.js")
const chalk = require("chalk")
const commandProcessor = require("./utils/commandProcessor")
const db = require("./utils/database")

// Config
const config = require("./config.json")

// Discord Client
const client = new Discord.Client()
client.commands = new Discord.Collection();
client.modules = {};

console.log(chalk.blue(fs.readFileSync("./Assets/banner.txt").toString() + "\n"));

require("./utils/commandsLoader")(client);

client.once('ready', () => {
    console.log(chalk.cyan(`[Kioru] logged in to Discord as ${client.user.tag} [${client.user.id}]`));
    client.user.setActivity('Wildways', { type: 'LISTENING' });
    client.setInterval(async () => {
        for (let i of client.guilds.cache.map(guild => guild.id)) {
            try {
                let x = await db.getmute(`${i}`, "users_mute", [])
                if (x.time <= 0) return
                const g = client.guilds.cache.get(i)
                let member = g.members.cache.get(x.uid)
                let mutedRole = g.roles.cache.find(mR => mR.name === "Kioru_Muted");
                if (Date.now() * 1000 > x.time) {
                     db.unmute(`${i}`, "users_mute", x.uid, 0).then(
                         member.roles.remove(mutedRole),
                )}
                else return;
            }
            catch (e) {
                console.log(e)
            }
        }
    }, 60000);
})


client.on("message", async (message) => {
    await commandProcessor(message, client);
    for (let i of client.guilds.cache.map(guild => guild.id)) {
        try {
            const g = client.guilds.cache.get(i)
            let mutedRole = g.roles.cache.find(mR => mR.name === "Kioru_Muted");
            if(message.member.roles.cache.find(r => r.name === "Kioru_Muted")) return message.delete()
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

console.log(chalk.gray(`[Kioru Boot] Bot booted in ${launchedTime - launchTime}ms`));


require("./events/logs")(client)
require("./events/automoderation")(client)

client.login(config.token).then(() => {
    console.log(chalk.gray(`[Kioru] started and ready to go in ${new Date() - launchTime}ms`))
});