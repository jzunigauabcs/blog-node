const db = require('../database/db');

const TABLE = 'post';

const getAll = async ()  =>  {
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE}`;

	return conn.execute(query);
}

const get = async (id) => {
	const conn = await db.getConnection();
	const query = `SELECT * FROM ${TABLE} WHERE id = ?`;

	return conn.execute(query, id);
}

exports.getAll = getAll;
