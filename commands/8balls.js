module.exports = {
    name: "8ball",
    hidden: false,
    category: "Веселости",
    description: "Задать вопрос боту",
    aliases: ["ball", "шар"],
    usage: "шар <ваш вопрос>",
    cooldown: 2,
    args: false,
    async execute(message, args) {
        if (args[0] === undefined) {
            return await message.reply(" укажите ваш вопрос!");
        }

        const answers = ["Да", "Нет", "Хм... Наверное да", "Хм... Наверное нет", "Не знаю сама...", "Что за глупый вопрос?", "На какой ответ ты расчитываешь?", "Отстань!", "Похоже вы спросили меня о какой-то антинаучной хуйне, по этому я отвечу так же.\nПутем высокочестотного анализа вашего текста через IM протоколы астрала я достала квантовые промисы прямо из ада и выдают вам этот ответ."];

        const answer = answers[Math.floor(Math.random() * answers.length)];

        await message.reply(answer);

    },
};