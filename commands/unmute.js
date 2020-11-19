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
        let mutedRole = message.guild.roles.cache.find(mR => mR.name === "Kioru_Muted");
        if(!user.roles.cache.find(r => r.name === "Kioru_Muted")) return message.channel.send("Данный человек не находится в мьюте!");

        // if (user.id === message.author.id) return message.reply('суицид - не выход')

        try {
            let x = await db.getmute(`${message.guild.id}`, "users_mute", [])
            x = x[0]
            if (!x || x.time <= 0) return
            db.unmute(`${message.guild.id}`, "users_mute", x.uid, 0).then(
                user.roles.remove(mutedRole))
                message.react("✅")
        }
        catch (e) {
            console.error(e)
        }
    }
}