const db = require("../utils/database.js");
const config = require("../config.json")

module.exports = {
    name: "prefix",
    category: "Утилиты",
    description: "Установите свой перфикс на вашем сервере",
    usage: "prefix <ваш префикс>",
    aliases: ["префикс"],
    async execute(message, args) {
        if (!args[0]) {
            const prefix = await db.get(message.guild.id, "guild_settings_prefixes", config.prefix);
            return message.reply(`мой префикс здесь - **${prefix}**\nВы можете его сменить, прописав эту комманду но указав сам префикс.`)
        }
        if(args[0].length >= 5) {
            return message.reply("укажите префикс не больше 5 символов!")
        }

        return db
            .set(message.guild.id, "guild_settings_prefixes", args[0])
            .then(() => message.react("✅"));
    },
};