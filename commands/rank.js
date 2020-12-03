const htmlToImage = require("node-html-to-image");
const db = require("../utils/database.js");
const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");
const getMember = require("../utils/getMember.js");
const lvlUtils = require("../utils/levelsUtils.js");

module.exports = {
    name: "rank",
    category: "Уровни",
    description: "Карточка юзера с информацией о уровне",
    async execute(message, args, client) {
        let userId = getMember(args[0]);
        if (!userId) userId = message.author.id;

        const user = client.users.cache.get(userId);
        if (user.bot) return await (message.channel.send("Нету у меня паспорта, отстань!"));

        const exp = await db.get(`${message.guild.id}_${message.author.id}`, "users_exp", 0);

        const templateContent = fs
            .readFileSync(path.join(process.cwd(), "Assets", "rankCard.hbs"))
            .toString();
        const template = Handlebars.compile(templateContent);

        const ctx = {
            avatar: user.avatarURL(),
            tag: user.tag,
            exp,
            lvl: lvlUtils.getLevelFromExp(exp),
        };

        const img = await htmlToImage({ html: template(ctx), transparent: true, puppeteerArgs: { args: ['--no-sandbox'] } });
        message.channel.stopTyping();
        return message.channel.send({ files: [img] });
    }
}
