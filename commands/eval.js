const Discord = require("discord.js");
const config = require("../config.json")
const util = require("util");

module.exports = {
    name: "eval",
    category: "Утилиты для сис. админов",
    description: "Зачем тебе оно?",
    usage: "Зачем тебе оно?",
    hidden: true,
    aliases: ["евал", "ebal"],
    async execute(message, args) {
    	if (message.author.id !== "622747295435456512") return;
        const embed = new Discord.MessageEmbed();
        let success = true;
        let result = "";
        let error, start, end;
        try {
            start = new Date();
            const code = args.join(" ");
            let evaled = eval(code)
            result = util.inspect(evaled)
            if (result.length < 1) success = false
            end = new Date();
        }
        catch (e) {
            success = false;
            error = e;
            end = new Date();
        }
        if (success) {
            embed.setColor(config.colors.successfully)
            embed.addField("Результат:", `\`\`\`js\n${result || "\"нет результата\""}\n\`\`\``)
        }
        if (!success) {
            embed.setColor("RED")
            embed.setTitle("Произошла ошибка!")
            embed.addField("Ошибка:", "```js\n" + error + "\n" + error.stack + "```")
        }
        embed.setFooter(`Исполнено за ${start - end}`)
        message.channel.send(embed).then(() => {
            message.channel.send(result)
        })
    },
};