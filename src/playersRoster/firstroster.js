const mongoose = require("mongoose");

const playerRosterSchema = mongoose.Schema({
    team: {
        type: String,
        requiere: true,
    },
    name: {
        type: String,
        requiere:true
    },
    position: {
        type: String,
        requiere: true
    },
    number: {
        type: Number,
        requiere: true
    }
})

module.exports = mongoose.model("PlayersRoster", playerRosterSchema)