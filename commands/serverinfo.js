const Discord = require("discord.js");
const config = require("../config.json")

module.exports = {
    name: "serverinfo",
    category: 'Информация',
    description: "Информация про сервер",
    aliases: ["сервер", "серверинфо", "server"],
    usage: "serverinfo",
    args: false,
    async execute(message, _, client) {

    const online = message.guild.members.cache.filter(c => c.presence.status == "online").size;
    const idle = message.guild.members.cache.filter(c => c.presence.status == "idle").size;
    const dnd = message.guild.members.cache.filter(c => c.presence.status == "dnd").size;
    const offline = message.guild.members.cache.filter(c => c.presence.status == "offline").size;
    const text = message.guild.channels.cache.filter(c => c.type == "text").size;
    const voice = message.guild.channels.cache.filter(c => c.type == "voice").size;

        let region
        if (message.guild.region === "russia") region = "<:putin:778557546277371964> :flag_ru:";
        else region = message.guild.region;

        const embed = new Discord.MessageEmbed()
        .setColor(config.colors.main)
        .setTitle(`${message.guild.name}`)
        .setAuthor("Информация про сервер")
        .setDescription(`Информация про сервер ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .addFields(
            { name: "Информация:", value: `⏳ Сервер создан: ${message.guild.createdAt.toLocaleString()} \n👑 Создатель сервера: ${message.guild.owner} \n:globe_with_meridians: Регион: ${region}`, inline: true },
            { name: "Участники:", value: ` Всего участников: ${message.guild.members.cache.size} \n<:online:754673899320508416> В онлайне: ${online}, \n<:idle:754673899362320424> Отошли: ${idle}, \n<:dnd:754673899102404649> Не беспокоить: ${dnd}, \n<:offline:754673899324833812> Оффлайн: ${offline}`, inline: true },
            { name: "Каналы", value: `🧭 Всего каналов: ${message.guild.channels.cache.size}, \n📝 Текстовых каналов: ${text}, \n🔊 Голосовых каналов: ${voice}` },
        )
        .setFooter(`${message.guild.id}`, client.user.avatarURL());
    message.channel.send(embed);
},
};