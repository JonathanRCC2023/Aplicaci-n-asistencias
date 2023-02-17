const { Router } = require('express')
const router = Router()
const{ renderEstudiante } = require('../controllers/estudiante.controller')


router.get('/estudiante/:id', renderEstudiante)

module.exports = router