const { Router } = require('express')
const router = Router()
const{ renderAsistencia,
    registrarAsistencia,
    updateAsistencia,
    formEditAsistencia,
    formAsistencia
 } = require('../controllers/asistencia.controller')



router.get('/registroAsistencia/:id', formAsistencia)
router.post('/asistencias/:id', registrarAsistencia)

router.get('/asistencias/:id', formEditAsistencia)
router.post('/asistencias', renderAsistencia)
router.post('/asistencia/update', updateAsistencia)


module.exports = router