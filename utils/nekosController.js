const axios = require("axios")

const uri = "https://nekos.life/api/v2/img/"

module.exports = {
    async get(target) {
        return await axios.get(uri + target).then(res => res.data.url)
    }
}