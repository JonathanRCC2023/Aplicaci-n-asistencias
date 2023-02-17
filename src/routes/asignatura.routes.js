const { Router } = require('express')
const router = Router()
const{ renderAsignatura, renderDetalle } = require('../controllers/asignatura.controller')


router.get('/materias/:id', renderAsignatura)

router.get('/detalleAsistencias/:id', renderDetalle)

module.exports = router