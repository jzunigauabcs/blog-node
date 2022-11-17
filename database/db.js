const mysql = require('mysql2/promise')
const db = require('../config/db');

exports.getConnection = async () => {
	const connection = await mysql.createConnection({
		host: db.host,
		database: db.database,
		user: db.user,
		password: db.password,
		port: db.port,
	})
	return connection;
}
