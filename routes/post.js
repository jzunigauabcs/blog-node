const express = require('express');
const router = express.Router();

const postService = require('../services/postService')
const {verifyToken} = require('../middleware/authJwt');

router.get("/", verifyToken, async (req, res) => {
		[results] = await postService.getAll();
	res.json({ code: 200, message: '', data: results});
})

router.get("/:id", async(req, res) => {
	const id = req.params.id;
	[results] = await postService.get(id);
	res.json({code: 200, message: '', data: results});
})

router.post('/', async(req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	[results ] = await postService.save(title, content);
	if(results.affectedRows === 1) 
		res.json({code: 201, message: 'Datos guardados correctamente'});
	else
		res.json({code: 400, message: 'Ocurrió un error al intentar guardar los datos'})
});

router.delete('/:id', async(req, res) => {
	const id = req.params.id;
	[results] = await postService.remove(id);
	if(results.affectedRows === 1) 
		res.json({code: 200, message: 'Datos eliminados correctamente'});
	else
		res.json({code: 200, message: 'Recurso no encontrado'})
});

module.exports = router;
