const launchTime = new Date();

// Libs
const fs = require("fs");
const Discord = require("discord.js")
const chalk = require("chalk")
const commandProcessor = require("./utils/commandProcessor")

// Config
const config = require("./config.json")

// Discord Client
const client = new Discord.Client()
client.commands = new Discord.Collection();
client.modules = {};

console.log(chalk.blue(fs.readFileSync("./assets/banner.txt").toString() + "\n"));

require("./utils/commandsLoader")(client);

client.once('ready', () => {
    console.log(chalk.cyan(`[Kioru] logged in to Discord as ${client.user.tag} [${client.user.id}]`));
    client.user.setActivity('Wildways', { type: 'LISTENING' });
})


client.on("message", async (message) => {
    await commandProcessor(message, client);
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