const Discord = require("discord.js")
const db = require("../utils/database")
const config = require("../config.json")
const cf = require('../utils/commandFinder')

module.exports = {
    name: "help",
    description: "Это сообщение",
    usage: "хелп [команда]",
    aliases: ['хелп', 'halp'],
    hidden: false,
    category: 'Информация',
    async execute(message, args, client) {
        const prefix = await db.get(message.guild.id, "prefix", config.prefix);
        const embed = new Discord.MessageEmbed()
            .setTitle('Справка по командам')
            .setColor(config.colors.main)
            .setThumbnail(client.user.avatarURL())
            .setDescription(`Мой префикс здесь - \`${prefix}\`, но также вы можете @упомянуть меня.\nТак же вы можете сменить префикс командой \`prefix\`\nВсего команд загружено: **${client.commands.size}**`)
        try {
            if(!args[0]) {
                for (const module in client.modules) {
                    console.log(client.modules)
                    const module1 = client.modules[module];
                    let commands = '';
                    for (const command of module1 ) {
                        commands += "`" + prefix + command.name + "` ";

                    }
                    embed.addField(`${module}`, commands);
                }
            }
            else {
                const commandName = args[0];
                if (!client.commands.has(commandName)) return message.react("❌");
                embed.setTitle(`Справка по комманде ${commandName}`);
                embed.setDescription("")
                const command = client.commands.get(commandName);
                if (command.hidden) return message.react("❌");
                embed.addField("Категория", `${command.category}`)
                embed.addField("Использование", `${prefix}${command.usage}`)
                embed.addField("Алиасы", `${command.aliases}`)
            }
        }
        catch (e) {
            console.log(e)
        }
        await message.channel.send(embed)
    }
}