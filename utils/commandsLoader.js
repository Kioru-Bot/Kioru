const fs = require("fs");

module.exports = client => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
    if (!command.hidden && command.category !== undefined) {
        client.modules[command.category] = client.modules[command.category] ? client.modules[command.category] : [];
        client.modules[command.category].push(command);
        }
    }
    console.log(`Successfully loaded ${commandFiles.length} commands`)
}