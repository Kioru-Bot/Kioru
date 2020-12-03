const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'ping',
    description: 'Узнать пинг бота',
    hidden: false,
    category: 'Информация',
    aliases: ['пинг'],
    args: false,
    usage: "пинг",
    async execute(message, args, client) {

        const SuccessEmbed = new Discord.MessageEmbed()
            .setColor(config.colors.successfully)
            .setTitle("Пинг Kioru Bot")
            .addField(`API Пинг`, Math.round(client.ws.ping) + "мс" , false)
            .addField(`User Пинг`, Date.now() - message.createdTimestamp + "мс", false)
            .addField('Другая статистика', `Аптайм: ${Math.round(client.uptime / 60000)} минут`, false)

        const ErrorEmbed = new Discord.MessageEmbed()
            .setColor(config.colors.error)
            .setTitle("<:error:751214509951156429> Произошла ошибка!")

        const WaitEmbed = new Discord.MessageEmbed()
            .setColor(config.colors.main)
            .setTitle("<\a:loader:778309154543763456>\ Ожидайте...")

        try {
            message.channel.send(WaitEmbed).then(msg => {
                msg.edit(SuccessEmbed)
            })
        }
        catch (e) {
            msg.edit(ErrorEmbed)
        }
    }
}