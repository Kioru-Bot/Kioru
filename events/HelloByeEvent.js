const Discord = require("discord.js");
const db = require("../utils/database.js");
const config = require("../config.json")
const hbs = require("handlebars")

module.exports = client => {
    client.on("guildMemberAdd", async member => {
        const getID = await db.get(`${member.guild.id}`, "guild_settings_hbChannel", undefined);
        const getTemplate = await db.get(`${member.guild.id}`, "guild_settings_hbTemplate", undefined);
        const channel = member.guild.channels.cache.get(getID);

        if (!channel) return;
        if (!getTemplate) return;
        const ctx = {
            name: member.displayName,
            tag: member.user.tag,
            guild: member.guild.name,
            total: member.guild.members.cache.size
        }
        const template = hbs.compile(getTemplate);
        channel.send(template(ctx));
    });

};