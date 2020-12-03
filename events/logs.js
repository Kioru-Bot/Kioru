const Discord = require("discord.js");
const db = require("../utils/database.js");
const config = require("../config.json")

module.exports = client => {
    client.on("messageDelete", async message => {

        // Получение канала для логов из бд
        const getID = await db.get(`${message.guild.id}`, "guild_settings_logs");
        const logChannel = message.guild.channels.cache.get(getID);

        if (!logChannel) return;


        if (message.author.bot) {
            return;
        }

        if (message.content == null || undefined) {
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor("Сообщание было удалено!")
            .setDescription("**Содержание сообщения**\n" + `\`\`\`${message.content}\`\`\` `)
            .setColor(config.colors.main)
            .addField(
                "Автор",
                message.author,
                true,
            )
            .addField(
                "Канал",
                message.channel,
                true,
            )
            .setFooter(`ID сообщения: ${message.id} || ID автора: ${message.author.id}`);
        logChannel.send(embed);

    });

    client.on("messageUpdate", async (oldMessage, newMessage) => {

        if (newMessage.author.bot) {
            return;
        }

        // Получение канала для логов из бд
        const getID = await db.get(`${newMessage.guild.id}`, "guild_settings_logs");
        const logChannel = newMessage.guild.channels.cache.get(getID);

        if (!logChannel) return;

        const embed = new Discord.MessageEmbed()
            .setAuthor("Сообщание было изменено!")
            .setDescription("**Содержание старого сообщения**\n" + `\`\`\`${oldMessage.content}\`\`\` ` + "**Содержание старого сообщения**\n" + `\`\`\`${newMessage.content}\`\`\` `)
            .setColor(config.colors.main)
            .addField(
                "Автор",
                newMessage.author,
                true,
            )
            .addField(
                "Канал",
                newMessage.channel,
                true,
            )
            .setFooter(`ID сообщения: ${newMessage.id} || ID автора: ${newMessage.author.id}`);

        logChannel.send(embed);
    });

    client.on("guildMemberAdd", async member => {
        // Получение канала для логов из бд
        const getID = await db.get(`${member.guild.id}`, "guild_settings_logs");
        const logChannel = member.guild.channels.cache.get(getID);

        if (!logChannel) return;

        const embed = new Discord.MessageEmbed()
            .setAuthor("На сервер зашёл участник!")
            .setColor(config.colors.main)
            .setDescription(`${member}`)
            .setFooter(`ID ${member.id}`)
            .setTimestamp();
        logChannel.send(embed);
    });

    client.on("guildMemberRemove", async member => {
        // Получение канала для логов из бд
        const getID = await db.get(`${member.guild.id}`, "guild_settings_logs");
        const logChannel = member.guild.channels.cache.get(getID);

        if (!logChannel) return;

        const embed = new Discord.MessageEmbed()
            .setAuthor("Участник покинул сервер!")
            .setColor(config.colors.main)
            .setDescription(`${member}`)
            .setFooter(`ID ${member.id}`)
            .setTimestamp();
        logChannel.send(embed);
    });

    client.on("kioru_warn", async warn => {
        const getID = await db.get(`${warn.user.guild.id}`, "guild_settings_logs");
        const logChannel = warn.user.guild.channels.cache.get(getID);

        if (!logChannel) return;

        const embed = new Discord.MessageEmbed()
            .setAuthor("Выдано предупреждение")
            .setDescription(`${warn.reason}`)
            .setFooter(`ID ${warn.id} | Модератором ${warn.moderator.tag} (${warn.moderator.id})`)
            .addField("Участник:", warn.user.toString() + " | " + warn.user.user.id)
            .setColor(config.colors.main)
            .setTimestamp();
        logChannel.send(embed);
    });

    client.on("kioru_unwarn", async (warn) => {
        const getID = await db.get(`${warn.user.guild.id}`, "guild_settings_logs");
        const logChannel = warn.user.guild.channels.cache.get(getID);

        if (!logChannel) return;

        const embed = new Discord.MessageEmbed()
            .setAuthor("Снято предупреждение")
            .setFooter(`ID ${warn.id} | Модератором ${warn.moderator.user.id}`)
            .addField("Участник:", warn.user.tag + " | " + warn.user.user.id)
            .setColor(config.colors.main)
            .setTimestamp();
        logChannel.send(embed);
    });
};