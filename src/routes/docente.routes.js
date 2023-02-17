const { Router } = require('express')
const router = Router()
const{ listarDocente, renderPerfil } = require('../controllers/docente.controller')


router.get('/docentes', listarDocente)
router.get('/docentePerfil', renderPerfil)

module.exports = router