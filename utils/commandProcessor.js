
// Данный Код на 80% написан KislBall#9017, и на 20% EnotKEK3#3100 (Кислый не бей только ок)

const Discord = require("discord.js");
const {prefix: DefaultPrefix} = require("../config.json");
const db = require("../utils/database")
const commandFinder = require("../utils/commandFinder")

const cds = new Discord.Collection();

const Regex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = async (message, client) => {

    if (message.author.bot) return;

    const prefix = await db.get(message.guild.id, "guild_settings_prefixes", DefaultPrefix);

    const pRegex = new RegExp(
        `^(<@!?${client.user.id}>|${Regex(prefix)})\\s*`,
    );
    if (!pRegex.test(message.content)) return;

    const [, mPrefix] = message.content.match(pRegex);
    const args = message.content.slice(mPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =commandFinder(commandName, client);

    if (!command) return;

    if (!message.guild) return;

    if (command.permissions) {
        let num = 0;
        for (const perm of command.permissions) {
            num = num | Discord.Permissions.FLAGS[perm];
        }
        if (!message.member.permissions.has(num)) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.reply('у вас недостаточно прав для этого!')
            }
        }
    }
    if (command.args && !args.length) {
        let reply = `${message.author}!, вы дали неверные аргументы!`;

        if (command.usage) {
            reply += `\nПравильное использование: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cds.has(command.name)) {
        cds.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cds.get(command.name);
    const cdAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expiration = timestamps.get(message.author.id) + cdAmount;

        if (now < expiration) {
            const timeLeft = (expiration - now) / 1000;
            return message.reply(
                `подождите еще ${timeLeft.toFixed(
                    1,
                )} секунд перед использование команды \`${command.name}\`!`,
            );
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cdAmount);

    try {
        await command.execute(message, args, client);
    }
    catch (error) {
        console.log(error)
        if (error instanceof Discord.DiscordAPIError) {
            return message.reply(
                "При выполнении команды произошла API ошибка, выдайте права боту, или обратитесь на сервер поддержки (!бот)",
            );
        }
        message.reply("произошла ошибка во время запуска команды!");
    }

    console.log(
        `Executed command ${commandName} by ${message.author.tag}(${message.author.id}) in guild ${message.guild.name}(${message.guild.id}) with following message(${message.id}): ${message.content}`,
        false,
    );
}