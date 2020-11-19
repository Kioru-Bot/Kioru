const Discord = require("discord.js");
const config = require("../config.json");
const getMember = require("../utils/getMember")
const db = require("../utils/database")

module.exports = {
    name: 'mute',
    description: 'Выдать мьют пользователю',
    hidden: false,
    category: 'Модерация',
    aliases: ['заткнись', 'shutup', 'мьют', 'мут'],
    usage: "мьют <юзер> <время> [причина]",
    permissions: ["KICK_MEMBERS"],
    async execute(message, args, client) {
        if (!args[0]) return await (message.reply("укажите участника!"));
        const userId = getMember(args[0]);
        if (!userId) return await (message.reply("Укажите участника!"));

        const user = message.guild.members.cache.get(userId);
        let mutedRole = message.guild.roles.cache.find(mR => mR.name === "Kioru_Muted");
        if (!mutedRole) {
            try {
                mutedRole = await message.guild.roles.create({
                    data: {
                        name: "Kioru_Muted",
                        color: "#757575",
                        permissions: []
                    },
                    reason: "Создана роль мьюта"
                });
            }
            catch (e) {
                return console.log(e)
            }
        }
        if(user.roles.cache.find(r => r.name === "Kioru_Muted")) return message.channel.send("Данный человек уже находится в мьюте!");

        if (!user) return await (message.reply("Укажите участника!"));
        // if (user.id === message.author.id) return message.reply('суицид - не выход')
        if (user.id === client.user.id) return message.reply('нет.........')

        let time = args.slice(1, 2)
        let reason = args.slice(2).join(" ");

        if (!time) return await (message.reply("Укажите время"));
        if (!reason) reason = "Не указана"

        let timex = Date.now() + parseInt(time) * 1000
        let member = user.user.id
        return db.setmute(`${message.guild.id}`, "users_mute", member, timex)
            .then(() => {
                user.roles.add(mutedRole, `Мьют`)
        }).then(() => {
                message.react("✅")
            })
    }
}