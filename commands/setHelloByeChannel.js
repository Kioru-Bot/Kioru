const db = require("../utils/database.js");
const getChannel = require("../utils/getChannel.js");

module.exports = {
    name: "sethchannel",
    category: "Утилиты",
    description: "Установит канал где бот будет приветствовать участников.",
    usage: "sethchannel #пинг_канала (Укажите 0 если хотите убрать вовсе)",
    permissions: ["MANAGE_GUILD"],
    async execute(message, args) {
        if (args[0] === "0") {
            return await db.delete(`${message.guild.id}`, "guild_settings_hbChannel").then(message.reply("канал приветсвий очищен."))
        }
        const channel = getChannel(args[0].slice(2, -1));
        let checkerChannel = message.guild.channels.cache.get(channel)
        if (!checkerChannel) return message.reply("я не нашла этот канал.")
        return  db.set(`${message.guild.id}`, "guild_settings_hbChannel", channel).then(message.react("✅"));
    },
};