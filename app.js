const express = require("express");
const app = express();

const blogService = require('./services/blogService')

const PORT = 3000;

app.get("/post", async (req, res) => {
		[results] = await blogService.getAll();
		res.json(results);
})

app.get("post/:id", async(req, res) => {
	[results] = await blogService.get(id)
})

app.listen(PORT, () => {
	console.log('Connect to server 🖥️');
})
