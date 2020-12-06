module.exports = (commandName, client) => {
    return client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName),
        );
};