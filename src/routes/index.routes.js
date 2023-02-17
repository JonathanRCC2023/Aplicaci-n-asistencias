const { Router } = require('express')
const router = Router()
const{renderIndex, signin, cerrar, loginInicio} = require('../controllers/index.controller')

router.get('/', renderIndex)

router.post('/login', signin )

router.get('/login', loginInicio )

router.get('/cerrar', cerrar)

module.exports = router