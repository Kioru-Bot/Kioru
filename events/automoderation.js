const inviteRegex = () => {
    const protocol = '(?:(?:http|https)://)?';
    const subdomain = '(?:www.)?';
    const domain = '(?:disco|discord|discordapp).(?:com|gg|io|li|me|net|org)';
    const path = '(?:/(?:invite))?/([a-z0-9-.]+)';

    const regex = `(${protocol}${subdomain}(${domain}${path}))`;

    return new RegExp(regex, 'i');
};

async function inviteCheck(client, message) {
    if (!message.member.hasPermission('ADMINISTRATOR') && message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES')) {
        const check = inviteRegex().test(message.content);
        if (check) {
            const fetchInvite = await client.fetchInvite(message.content).catch(null);
            if (fetchInvite.guild.id === message.guild.id) return false;

            if (message.channel.permissionsFor(client.user.id).has('MANAGE_MESSAGES')) {
                await message.delete().catch(null);
            }

            message.channel.send(`${message.author} рекламирует свой сервер!`);
            return true;
        }
        return false;
    }
    return false;
}

module.exports = client => {
    client.on("message", async message => {
        if (message.author.bot) return;

        if (message.channel.type === 'dm') return;

        if (await inviteCheck(client, message)) return;
    })
}