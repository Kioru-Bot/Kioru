const express = require("express")
const client = require("../")

const stats = express.Router()
stats.get("/stats", ((req, res) => {
    res.json({
        guilds: client.guilds.cache.size,
        channels: client.channels.cache.size,
        users: client.users.cache.size
    })
}))

stats.get("/stats", ((req, res) => {
    res.json({
        guilds: client.guilds.cache.size,
        channels: client.channels.cache.size,
        users: client.users.cache.size
    })
}))
stats.get("/guilds", ((req, res) => {
    res.json({
        guilds: client.guilds.cache.map(guild => guild.id),
    })
}))

module.exports = stats
