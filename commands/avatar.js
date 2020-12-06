
const config = require("../config.json")
const Discord = require("discord.js");
const getMember = require("../utils/getMember.js");

module.exports = {
    name: "avatar",
    category: 'Информация',
    description: "Информация про юзера",
    aliases: ["аватар", "ава", "морда"],
    usage: "avatar [пинг юзера]",
    args: false,
    async execute(message, args) {

        let id
        if (args[0] === undefined) {
             id = message.author.id;
        }
        else {
            id = getMember(args[0]);
        }

        /**
         * @type {Discord.GuildMember}
         */
        const user = message.guild.members.resolve(id);

        let color = message.member.displayHexColor;
        if (color === '#000000') color = message.member.roles.hoist.hexColor;
        const embed = new Discord.MessageEmbed()
            .setTitle(`Аватар ${user.user.tag}`)
            .setImage(user.user.avatarURL({dynamic: true, size: 1024}))
            .setColor(color)
        message.channel.send(embed);
    },
};
