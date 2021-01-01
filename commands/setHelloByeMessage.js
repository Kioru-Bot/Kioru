const db = require("../utils/database.js");
const getChannel = require("../utils/getChannel.js");

module.exports = {
    name: "sethmessage",
    category: "Утилиты",
    description: "Установит сообщения которым бот будет приветствовать юзеров.",
    usage: "sethmessage {{name}}, {{tag}}, {{guild}}, {{total}}\nname - Имя участника (Punk)\ntag - Имя участника + тег (Punk#6660)\nguild - Имя сервера (Нора Панка)\ntotal - количество участников на сервере (666)",
    permissions: ["MANAGE_GUILD"],
    async execute(message, args) {
        if (!args[0]) return message.reply(this.usage)
        if (args[0] === "0") {
            return await db.delete(`${message.guild.id}`, "guild_settings_hbTemplate").then(message.reply("канал приветсвий / прощаний очищен."))
        }
        return  db.set(`${message.guild.id}`, "guild_settings_hbTemplate", args.slice(0).join(" ")).then(message.react("✅"));
    },
};