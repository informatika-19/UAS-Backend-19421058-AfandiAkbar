const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const LapanganSchema = new Schema ({
    lapangan: {
        type: String
    },
    harga: {
        type: Number
    },
    lokasi: {
        type: String
    },
    alas: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})
module.exports = mongoose.model('lapangan', LapanganSchema)