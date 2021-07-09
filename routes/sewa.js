const router = require('express').Router()
const sewaController = require('../controller/Sewa')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
    {
        name: 'image',
        maxCount: 1
    }
])

router.post('/insert', fields, (req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])

    const data = Object.assign(JSON.parse(req.body.data), {
        image: imageName
    })

    sewaController.insert(data)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getallsewa', (req, res) =>{
    sewaController.getAllSewa()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getsewabyUser/:id', (req, res) =>{
    sewaController.getSewaByUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.put('/konfirmasisewa/:id', (req, res) =>{
    sewaController.konfirmasiSewa(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.put('/konfirmasibayar/:id', (req, res) =>{
    sewaController.konfirmasiBayar(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = router
