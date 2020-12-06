const db = require("../utils/database.js");
const ms = require("ms");
const config = require("../config.json")
const Discord = require("discord.js");

module.exports = {
    name: "userinfo",
    category: 'Информация',
    description: "Информация про юзера",
    aliases: ["юзер", "юзеринфо", "user"],
    usage: "userinfo",
    args: false,
    async execute(message, args, client) {
        let id, nickname, status;

        const getMember = require("../utils/getMember.js");
        if (args[0] === undefined) {
            id = message.author.id;
        }
        else {
            id = getMember(args[0]);
        }

        /**
         * @type {Discord.GuildMember}
         */
        const user = message.guild.members.resolve(id)

        let statuses = {
            online : "<:online:754673899320508416> Онлайн",
            idle : "<:idle:754673899362320424> Отошёл",
            dnd : "<:dnd:754673899102404649> Не беспокоить",
            offline : "<:offline:754673899324833812> Оффлайн",
        };

        if (user.presence) status = statuses[user.presence.status] ?? "Произошла ошибка!"
        else status = "Ошибка определения"

        let usr
        if (!user.user) usr = user
        else usr = user.user

        const embed = new Discord.MessageEmbed()
            .setColor(config.colors.main)
            .setTitle(`${usr.tag}`)
            .setAuthor("Информация про пользователя")
            .setDescription(
                await db.get(
                    `${message.guild.id}||${user.user.id}`,
                    "bio",
                    "Пользователь не указал информацию о себе",
                ),
            )
            .addFields({
                name: "Основная информация:",
                value: `Имя пользователя: ${user}\nАккаунт создан: ${user.user.createdAt.toLocaleString()}\nПрисоединился: ${user.joinedAt.toLocaleString()}\nСтатус: ${status}\nИграет в: ${
                    user.presence.activities.length !== 0
                        ? user.presence.activities.join(" ")
                        : "Ничего"
                }`,
            })
            .setThumbnail(user.user.avatarURL({dynamic: true, size: 1024}));
        message.channel.send(embed);
    },
};