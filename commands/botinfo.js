const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "botinfo",
    description: "Информация о боте",
    category: 'Информация',
    aliases: ['бот', 'ботинфо', 'bot'],
    hidden: false,
    usage: "бот",
    async execute(message, args, client) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.colors.main)
            .setAuthor("Kioru Bot", `${client.user.avatarURL()}`)
            .setTitle("Информация о боте")
            .setDescription("Здесь вы сможете увидеть информацию о боте Kioru")
            .setThumbnail("https://img.icons8.com/cotton/2x/info--v1.png")
            .addField("Версии:", `Kioru - ${config.version}\nNode.js - ${process.version}\nDiscord.js - ${Discord.version}`, true)
            .addField("Создатели", "EnotKEK3#3100", true)
            .addField("Статистика", `
            Всего серверов - ${client.guilds.cache.size}
            Всего юзеров - ${client.users.cache.size}
            Пинг - ${client.ws.ping} мс
            Использование ОЗУ - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)} Мб.
            Аптайм - ${Math.round(client.uptime / 60000)} минут
            `, false)
            .addField("Ссылки", `
            [Сервер Сообщества](https://discord.gg/cT8fK6Y5hc)
            Сайт (В разработке)
            `, false)
            .setFooter(config.copy)
        await message.channel.send(embed)
    }
}