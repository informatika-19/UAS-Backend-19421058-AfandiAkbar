const lapanganModel = require('../model/Lapangan')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')
const { move } = require('../routes/User')

exports.insertLapangan = (data) =>
    new Promise((resolve, reject) => {
         lapanganModel.create(data)
        .then(() => resolve(requestResponse.sukses('Berhasil Input Data')))
        .catch(() => reject(requestResponse.serverError))
    })

exports.getAllLapangan = () =>
    new Promise((resolve, reject) => {
    lapanganModel.find({})
    .then(lapangan => resolve(requestResponse.suksesWithData(lapangan)))
    .catch(error => reject(requestResponse.serverError))
    })

exports.getbyId = (id) =>
    new Promise((resolve, reject) => {
        lapanganModel.findOne({
            _id: objectId(id)
        }).then(lapangan => resolve(requestResponse.suksesWithData(lapangan)))
          .catch(error => reject(requestResponse.serverError))
    })

exports.edit = (data, id, changeImage) => 
    new Promise((resolve, reject) => {
        lapanganModel.updateOne({
            _id: objectId(id)
            }, data)
                .then(() => {
                    if (changeImage) {
                        deleteImage(data.oldImage)
                    }
                    resolve(requestResponse.sukses('Berhasil Edit Data'))
                }).catch(() => reject(requestResponse.serverError))
            })

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    lapanganModel.findOne({
    _id: objectId(id)
    }).then(lapangan => {
        lapanganModel.deleteOne({
            _id: objectId(id)
        }).then(() => {
            deleteImage(lapangan.image)
            resolve(requestResponse.sukses('Berhasil Hapus Data'))
        }). catch (() => reject(requestResponse.serverError))
    })
})