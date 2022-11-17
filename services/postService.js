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

	return conn.execute(query, [id]);
}

const save = async (title, content) => {
	const conn = await db.getConnection();
	const query =  `INSERT INTO ${TABLE}(title, content) VALUE(?, ?)`;
	return conn.execute(query, [title, content]);
}

const remove = async (id) => {
	const conn = await db.getConnection();
	const query = `DELETE FROM ${TABLE} WHERE id = ?`;
	return conn.execute(query, [id]);
}

exports.getAll = getAll;
exports.get = get;
exports.save = save;
exports.remove = remove;
