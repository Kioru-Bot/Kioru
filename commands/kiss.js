const config = require("../config.json");
const Discord = require("discord.js");
const getMember = require("../utils/getMember.js");
const nekosCont = require("../utils/nekosController")

module.exports = {
    name: "kiss",
    category: 'Role-Play',
    description: "Поцеловать юзера",
    aliases: ["поцеловать"],
    usage: "kiss @юзер",
    args: false,
    async execute(message, args, client) {
        if (!args[0]) return message.reply("укажите юзера!")
        if (message.guild.members.resolve(getMember(args[0])).id === client.user.id) return message.reply("убери от меня руки, извращенец -.-")

        const embed = new Discord.MessageEmbed()
            .setColor(config.colors.main)
            .setTitle(`${message.member.user.tag} поцеловал ${message.guild.members.resolve(getMember(args[0])).user.tag}`)
            .setImage(await nekosCont.get("kiss"))
        return message.channel.send(embed)
    }
}