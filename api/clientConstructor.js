const express = require("express")
const stats = require("./FUCK_YOU")
const cors = require("cors")
const port = process.env.PORT || 3000

class RAPI {
    constructor(client) {
        this.client = client
        this.app = express()
        this.app.use(cors())
        this.routes()
        this.app.listen(port, () => {
            console.log(`[R.API] Successfully booted in http://localhost:${port}`)
        })
        this.app.get("/stats", ((req, res) => {
            res.json({
                guilds: client.guilds.cache.size,
                channels: client.channels.cache.size,
                users: client.users.cache.size
            })
        }))
        this.app.get("/guilds", ((req, res) => {
            res.json({
                guilds: client.guilds.cache.map(guild => guild.id),
            })
        }))
    }

    routes() {
        this.app.use("/v1", stats)
    }

}
module.exports = RAPI
