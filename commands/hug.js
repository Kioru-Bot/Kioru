const config = require("../config.json");
const Discord = require("discord.js");
const getMember = require("../utils/getMember.js");
const nekosCont = require("../utils/nekosController")

module.exports = {
    name: "hug",
    category: 'Role-Play',
    description: "Обнять юзера",
    aliases: ["обнять"],
    usage: "hug @юзер",
    args: false,
    async execute(message, args, client) {
        if (!args[0]) return message.reply("укажите юзера!")

        const embed = new Discord.MessageEmbed()
            .setColor(config.colors.main)
            .setTitle(`${message.member.user.tag} обнял ${message.guild.members.resolve(getMember(args[0])).user.tag}`)
            .setImage(await nekosCont.get("hug"))
        return message.channel.send(embed)
    }
}