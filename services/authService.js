const db = require('../database/db');

const TABLE = 'user';

const register = async(nombre, primerAp. segundoAp, email, password) => {
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE} VALUE(?, ?, ?, ?, ?)`;
	//password = 
	return conn.execute(nombre, primerAp, segundoAp, email, password);
}
