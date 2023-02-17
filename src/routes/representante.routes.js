const { Router } = require('express')
const router = Router()
const{ renderRepresentante } = require('../controllers/representante.controller')


router.get('/representante/:id', renderRepresentante)

module.exports = router