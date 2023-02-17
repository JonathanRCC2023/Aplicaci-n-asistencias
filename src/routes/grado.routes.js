const { Router } = require('express')
const router = Router()
const{ renderGrado, getGrado } = require('../controllers/grado.controller')


router.get('/aulas', renderGrado)
router.get('/grados', getGrado)

module.exports = router