module.exports = {
    name: "random",
    hidden: false,
    category: "Веселости",
    description: "Выберет рандомное число",
    aliases: ["ранд", "рандом" ],
    usage: "ранд <число>",
    args: false,
    async execute(message, args) {
        if (!args[0]) return message.reply("укажите цифру!");
        
        const num = args;
        if (num[0] > 10000) {
            return await message.reply("Я не могу обрабатывать настолько большие числа!");
        }
        const answer = Math.floor(Math.random() * num[0]) + 1;
        await message.reply(answer);

    },
};
