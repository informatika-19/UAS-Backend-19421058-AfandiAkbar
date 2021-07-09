const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Schema.ObjectId

const SewaSchema = new Schema ({
    idUser: {
        type: objectId
    },
    idLapangan: {
        type: objectId
    },
    harga: {
        type: Number
    },
    durasi: {
        type: Number
    },
    total: {
        type: Number
    },
    mulai: {
        type: String
    },
    selesai: {
        type: String
    },
    noTelp: {
        type: Number
    },
    image: {
        type: String
    },
    //1 = belum di verifikasi, 2 = sedang dalam pengiriman, 3 = sudah diterima
    status: {
        type: Number,
        default: 1
    }

})
module.exports = mongoose.model('sewa', SewaSchema)