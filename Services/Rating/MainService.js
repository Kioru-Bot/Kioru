const Discord = require("discord.js")
const db = require("../../utils/database.js");

const randint = (min, max) =>
    Math.round(min - 0.5 + Math.random() * (max - min + 1));

module.exports = client => {
    client.on("message", async message => {
        if (!message.guild) return;
        if (message.author.bot) return

        const totalExp = await db.get(`${message.guild.id}_${message.author.id}`, "users_exp", 0);
        const totalMessages = await db.get(`${message.guild.id}_${message.author.id}`, "users_messages", 0);
        const given = totalExp + randint(10, 25);
        const messages = totalMessages + 1
        await db.set(`${message.guild.id}_${message.author.id}`, "users_messages", messages)
        await db.set(`${message.guild.id}_${message.author.id}`, "users_exp", given);
    })
}