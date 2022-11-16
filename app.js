const express = require("express");
const app = express();
const dbConfig = require("./config/db");

const PORT = 3000;

app.listen(PORT, () => {
	console.log('Connect to server 🖥️');
})
