const sewaModel = require('../model/sewa')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
    new Promise((resolve, reject) => {
        try{
            sewaModel.create(data)
            .then(() => resolve(requestResponse.sukses('Berhasil Memproses Transaksi')))
            .catch(() => reject(requestResponse.serverError))
        } catch (error) {
            console.log(error)
        }
    })

exports.getAllSewa = () =>
    new Promise((resolve, reject) => {
        sewaModel.aggregate([
            {
                $lookup: {
                    from: "lapangans",
                    localField: "idLapangan",
                    foreignField: "_id",
                    as: "dataLapangan"
                }
            },
            {
            $lookup: {
                from: "users",
                localField: "idUser",
                foreignField: "_id",
                as: "dataUser"
            }
        }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject (requestResponse.serverError))
    })

exports.getSewaByUser = (id) =>
new Promise((resolve, reject) => {
    sewaModel.aggregate([
            {
                $match: {
                    idUser: objectId(id)
                }
            },
            {
                $lookup: {
                    from: "lapangans",
                    localField: "idLapangan",
                    foreignField: "_id",
                    as: "dataLapangan"
                }
        }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject (requestResponse.serverError))
    })

exports.konfirmasiSewa = (id) =>
    new Promise((resolve, reject) => {
        sewaModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 2
        }).then(() => resolve(requestResponse.sukses('Berhasil Mengkonfirmasi Order')))
        .catch(() => reject(requestResponse.serverError))
    })
    
exports.konfirmasiBayar = (id) =>
    new Promise((resolve, reject) => {
        sewaModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 3
        }).then(() => resolve(requestResponse.sukses('Berhasil Mengkonfirmasi Pembayaran')))
        .catch(() => reject(requestResponse.serverError))
    })