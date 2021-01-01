const Discord = require(`discord.js`)
const db = require("../utils/database")

module.exports = {
    name: `карта`,
    category: `Кастомизация`,
    description: `Установить фон для своей карты`,
    usage: "!карта",
    aliases: ['card'],
    async execute(message, args) {
        let member = message.member
        const bgs = require("../Assets/backgrounds")
        const embed = new Discord.MessageEmbed()
            .setColor(member.displayColor)
            .setTitle("Доступные карты")
            .setDescription("Чтоб установить фон пропишите `!карта <номер карты> (без #)`\nПример правильного использования `!карта 1`")
            .setThumbnail(member.user.avatarURL({dynamic: true, size: 2048}))
        let card;
        for (card of bgs) { // Добавление всех кард из массива в ембед
            embed.addField(`# ${card.id}`, `Превью [Тык ^^](${card.url})`, true)
        }
        if (!args[0]) {
            return message.reply("укажите фон карты").then(() => {
                message.channel.send(embed)
            })
        }
        if (args[0]) {
            for (card of bgs) {
                if (args[0] == card.id) {
                    db.set(`${message.guild.id}_${message.member.id}`, "users_card_background", card.id).then(() => {
                        message.reply("успешно сменено!")
                    })
                }
            }
        }
    }
}