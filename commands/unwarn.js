const Discord = require("discord.js");
const config = require("../config.json");
const getMember = require("../utils/getMember")
const db = require("../utils/database")

const randomId = () => Math.random().toString(16).slice(2);

module.exports = {
    name: 'unwarn',
    description: 'снять предупреждение юзеру',
    hidden: false,
    category: 'Модерация',
    aliases: ['анварн', 'снятьпред'],
    usage: "warn <id варна>",
    permissions: ["KICK_MEMBERS"],
    async execute(message, args, client) {
        let memberId = "";
        if (args[0]) memberId = getMember(args[0]);
        else memberId = message.author.id;

        if (!memberId) return message.channel.send("Укажите участника!");

        if (!args[1]) return message.channel.send("Укажите ID предупреждения!");

        const member = message.guild.members.cache.get(memberId);

        const warns = await db.get(`${message.guild.id}||${member.user.id}`, "users_warns", []);

        const check = warns.filter((el) => el.id === args[1]);

        if (check.length === 0) return message.channel.send("Неправильный айди предупреждения!");

        const final = warns.filter((el) => el.id !== args[1]);
        let user = member
        return db.set(`${message.guild.id}||${member.user.id}`, "users_warns", final)
            .then(() => message.react("✅"))
            .then(() => client.emit("kioru_unwarn", { id: args[0], moderator: message.member, user }));
    }
}