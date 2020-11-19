const db = require("../utils/database.js");
const getChannel = require("../utils/getChannel.js");

module.exports = {
    name: "setlog",
    category: "Модерация",
    description: "Установит канал логов",
    aliases: ["logs", "логи"],
    usage: "setlog #пинг_канала",
    permissions: ["MANAGE_GUILD"],
    async execute(message, args) {
        const channel = getChannel(args[0].slice(2, -1));
        return  db.set(`${message.guild.id}`, "guild_settings_logs", channel).then(message.react("✅"));
    },
};