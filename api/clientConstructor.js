const express = require("express")
const stats = require("./FUCK_YOU")
const cors = require("cors")

class RAPI {
    constructor(client) {
        this.client = client
        this.app = express()
        this.app.use(cors())
        this.routes()
        this.app.listen(process.env.PORT || 3000, () => {
            console.log("[R.API] Successfully booted in http://localhost:3030")
        })
        this.app.get("/stats", ((req, res) => {
            res.json({
                guilds: client.guilds.cache.size,
                channels: client.channels.cache.size,
                users: client.users.cache.size
            })
        }))
    }

    routes() {
        this.app.use("/v1", stats)
    }

}
module.exports = RAPI
