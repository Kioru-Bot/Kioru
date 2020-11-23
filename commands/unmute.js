const Discord = require("discord.js");
const config = require("../config.json");
const getMember = require("../utils/getMember")
const db = require("../utils/database")

module.exports = {
    name: 'unmute',
    description: 'Снять мьют с пользователя',
    hidden: false,
    category: 'Модерация',
    aliases: ['размут', 'размьют', 'пощадить'],
    usage: "размьют <юзер>",
    permissions: ["KICK_MEMBERS"],
    async execute(message, args, client) {
        if (!args[0]) return await (message.reply("укажите участника!"));
        const userId = getMember(args[0]);
        if (!userId) return await (message.reply("Укажите участника!"));

        const user = message.guild.members.cache.get(userId);

        let role = message.guild.roles.cache.get(await db.get(message.guild.id, "guilds_mute_roles",  0))

        if(!message.member.roles.cache.has(role.id)) return message.channel.send("Данный человек не находится в мьюте!!");

        // if (user.id === message.author.id) return message.reply('суицид - не выход')

        try {
            await user.roles.remove(role).then(() => message.react("✅"))
             return db.unmute(`${message.guild.id}`, "users_mute", user.id, 0)
        }
        catch (e) {
            console.error(e)
        }
    }
}