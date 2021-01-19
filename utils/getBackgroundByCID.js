const bgs = require("../Assets/backgrounds")

async function getBg(cid) {
    let a;
    for (a of bgs) {
        if (cid === a.id) {
            console.log(a.url)
            return a.url
        }
    }
}

module.exports = getBg