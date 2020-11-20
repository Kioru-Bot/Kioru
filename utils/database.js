
// Created by KislBall#9017

const keyv = require("keyv"); // for caching and stuff
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
        if (!cache[key]) {
            cache[key] = new keyv(config.cache, { namespace: key });
        }

        const client = await clientprom;

        const fromCache = await (cache[key].get(`${id}_${key}`));

        if (fromCache) {
            return fromCache;
        }

        const collection = client.db("kioru").collection(key);

        const toBeCached = await (collection.findOne({ id }));
        if (!toBeCached) {
            return def;
        }

        await (cache[key].set(`${id}`, toBeCached.value));
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
        if (!cache[key]) {
            cache[key] = new keyv(config.cache, { namespace: key });
        }

        const client = await clientprom;

        const fromCache = await (cache[key].get(`${id}_${key}`));

        if (fromCache) {
            return fromCache;
        }

        const collection = client.db("kioru").collection(key);

        const toBeCached = await (collection.find().sort({time: 1}).toArray());
        if (!toBeCached) {
            return def;
        }

        await (cache[key].set(`${id}`, toBeCached.value));
        return toBeCached;
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
        if (!cache[key]) {
            cache[key] = new keyv(config.cache, { namespace: key });
        }

        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        collection.updateOne({ id }, { $set: { value } }, { upsert: true });

        return await (cache[key].set(`${id}`, value));
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
        if (!cache[key]) {
            cache[key] = new keyv(config.cache, { namespace: key });
        }

        const client = await clientprom;
        const collection = client.db("kioru").collection(key);
        if(await collection.findOne({id, uid: uid}) !== null) {
            collection.updateOne({ id }, { $set: { uid, time } }, { upsert: true });
        }
        else collection.insertOne({ id, uid, time });

        return await (cache[key].set(`${id}`, uid, time));
    },

    /**
     * Снятие мута
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
    async unmute(id, key, uid, time) {
        if (!cache[key]) {
            cache[key] = new keyv(config.cache, { namespace: key });
        }
        time = 0
        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        collection.deleteOne({ id: id, uid: uid });

        return await (cache[key].set(`${id}`, uid, time));
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
        if (!cache[key]) {
            cache[key] = new keyv(config.cache, { namespace: key });
        }

        const client = await clientprom;
        const collection = client.db("kioru").collection(key);

        collection.deleteMany({ id });

        return await (cache[key].delete(`${id}`));
    },
};