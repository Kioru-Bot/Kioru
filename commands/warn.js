const Discord = require("discord.js");
const config = require("../config.json");
const getMember = require("../utils/getMember")
const db = require("../utils/database")

const randomId = () => Math.random().toString(16).slice(2);

module.exports = {
    name: 'warn',
    description: 'Выдать предупреждение юзеру',
    hidden: false,
    category: 'Модерация',
    aliases: ['варн', 'пред'],
    usage: "warn <юзер> [причина]",
    permissions: ["KICK_MEMBERS"],
    async execute(message, args, client) {
        if (!args[0]) return await (message.reply("укажите участника!"));
        const userId = getMember(args[0]);
        if (!userId) return await (message.reply("Укажите участника!"));

        const user = message.guild.members.cache.get(userId);

        if (!user) return await (message.reply("Укажите участника!"));

        const reason = args.slice(1).join(" ");

        if (!reason) return await (message.reply("Укажите причину"));

        const  Embed = new Discord.MessageEmbed()
            .setColor(config.colors.main)
            .setTitle("Выдано предупреждение")
            .setThumbnail(message.author.avatarURL())
            .addField("Выдал", `${message.author.tag}`, true)
            .addField("Кому", `${user.tag}`, true)
            .addField("По причине", `${reason}`, false)

        const warns = await db.get(`${message.guild.id}||${user.user.id}`, "users_warns", []);
        warns.push({
            moderator: message.author.id,
            reason,
            id: randomId(),
            date: new Date(),
        });

        return db.set(`${message.guild.id}||${user.user.id}`, "users_warns", warns)
            .then(() => message.react("✅"))
            .then(() =>
                client.emit("kioru_warn", {
                    moderator: message.author.id,
                    reason,
                    id: randomId(),
                    date: new Date(),
                    user,
                }),
            );
    }
}