const htmlToImage = require("node-html-to-image");
const db = require("../utils/database.js");
const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");
const getMember = require("../utils/getMember.js");
const lvlUtils = require("../utils/levelsUtils.js");
const getBg = require("../utils/getBackgroundByCID")

module.exports = {
    name: "rank",
    category: "Уровни",
    description: "Карточка юзера с информацией о уровне",
    usage: "!rank",
    aliases: [],
    async execute(message, args, client) {
        let userId = getMember(args[0]);
        if (!userId) userId = message.author.id;

        const user = client.users.cache.get(userId);
        if (user.bot) return await (message.channel.send("Чумба ты совсем ебнутый?"));

        let statuses = {
            online : "Онлайн",
            idle : "Отошёл",
            dnd : "Не беспокоить",
            offline : "Оффлайн",
        };

        if (user.presence) status = statuses[user.presence.status] ?? "Произошла ошибка!"

        const exp = await db.get(`${message.guild.id}_${message.author.id}`, "users_exp", 0);
        message.channel.startTyping()
        const templateContent = fs
            .readFileSync(path.join(process.cwd(), "Assets", "rankCard.hbs"))
            .toString();
        const template = Handlebars.compile(templateContent);

        let bg = await db.get(`${message.guild.id}_${message.member.id}`, "users_card_background", "https://cdn.discordapp.com/attachments/778266278040961046/792727722312204308/unnamed_2.jpg")
        if (bg !== "https://cdn.discordapp.com/attachments/778266278040961046/792727722312204308/unnamed_2.jpg") {
            bg = await getBg(bg)
        }
        const ctx = {
            avatar: user.avatarURL(),
            tag: user.tag,
            memberStatus: status,
            memberTotalExp: exp,
            memberTotalMessages: await db.get(`${message.guild.id}_${message.author.id}`, "users_messages", 0),
            memberLevel: lvlUtils.getLevelFromExp(exp),
            messages: await db.get(`${message.guild.id}_${message.author.id}`, "users_messages", 0),
            background: bg
        };

        const img = await htmlToImage({ html: template(ctx), transparent: true, puppeteerArgs: { args: ['--no-sandbox'] } });
        message.channel.stopTyping();
        return message.channel.send({ files: [img] });
    }
}
