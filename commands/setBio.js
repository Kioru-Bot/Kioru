const db = require("../utils/database.js");

module.exports = {
    name: "bio",
    category: "Утилиты",
    description: "Информация о себе",
    usage: "bio <текст>",
    aliases: ["био", "осебе"],
    execute(message, args) {
        if (!args[0]) return message.channel.send("Укажите текст!");

        return db
            .set(`${message.guild.id}||${message.author.id}`, "bio", args.join(" "))
            .then(() => message.react("✅"));
    },
};