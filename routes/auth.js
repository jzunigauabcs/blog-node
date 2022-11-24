const express = require('express');
const router = express.Router();

const checkEmail = require('../middleware/checkEmail');
const authService = require('../services/authService')

router.post('/register', checkEmail, async(req, res) => {
    const {nombre, primerAp, segundoAp, email, password} = req.body;
    const [result] = await authService.register(nombre, primerAp, segundoAp, email, password)
    if(result.affectedRows === 1) 
		res.json({code: 201, message: 'Datos guardados correctamente'});
	else
		res.json({code: 400, message: 'Ocurrió un error al intentar guardar los datos'})
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const data = await authService.login(email, password);
        res.json({code: 200, message: '', data:data})

    } catch(e) {
        res.json({code: 400, message: e.message})
    }
})

module.exports = router;