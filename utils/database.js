
// Created by KislBall#9017

const mongodb = require("mongodb");
const config = require("../config.json");

const cache = {};

const clientprom = mongodb.MongoClient.connect(config.mongo);

module.exports = {
    /**
     * Получить значение из БД
     *
     * @template defType
     *
     * @param {string} id айди
     * @param {string} key поле
     * @param {defType} def значение по умолчанию
     *
     * @returns {Promise<defType>}
     */
    async get(id, key, def) {
        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        const toBeCached = await (collection.findOne({ id }));
        if (!toBeCached) {
            return def;
        }

        return toBeCached.value;
    },

    /**
     * Получить значение мута
     *
     * @template defType
     *
     * @param {string} id айди
     * @param {string} key поле
     * @param {defType} def значение по умолчанию
     *
     * @returns {Promise<defType>}
     */
    async getmute(id, key, def) {
        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        const values = await (collection.find().sort({time: 1}).toArray());
        if (!values) {
            return def;
        }

        return values;
    },

    /**
     * Установка значения в БД
     *
     * @template T
     *
     * @param {string} id айди
     * @param {string} key поле
     * @param {T} value значение
     *
     * @returns {Promise<T>}
     */
    async set(id, key, value) {

        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        collection.updateOne({ id }, { $set: { value } }, { upsert: true });

    },

    /**
     * Установка мута
     *
     * @template T
     *
     * @param {string} id айди
     * @param {string} key поле
     * @param {T} uid значение id юзера
     * @param {T} time значение времени
     *
     * @returns {Promise<T>}
     */
    async setmute(id, key, uid, time) {

        const client = await clientprom;
        const collection = client.db("kioru").collection(key);
        collection.updateOne({ uid }, { $set: { uid, time } }, { upsert: true });

    },

    /**
     * Снятие мута
     *
     * @template T
     *
     * @param {string} id айди
     * @param {string} key поле
     * @param {T} uid значение id юзера
     *
     * @returns {Promise<T>}
     */
    async unmute(id, key, uid) {
        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        collection.deleteOne({ id: id, uid: uid });
    },

    /**
     * Удаление ключа в БД
     *
     * @param {string} id айди
     * @param {string} key поле
     *
     * @returns {Promise}
     */
    async delete(id, key) {

        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        collection.deleteMany({ id });
    },
};