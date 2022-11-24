const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET} = require('../config/secret')
const TABLE = 'user';
const saltRounds = 10;


const register = async(nombre, primerAp, segundoAp, email, password) => {
	const hashPwd = await bcrypt.hash(password, saltRounds);
	const conn = await db.getConnection();
	const query = `INSERT INTO ${TABLE}(nombre, primer_ap, segundo_ap, email, password) VALUE(?, ?, ?, ?, ?)`;
	
	return conn.execute(query, [nombre, primerAp, segundoAp, email, hashPwd]);
}

const login = async(email, password) => {
	const query = 'SELECT * FROM user WHERE email = ?';
	const conn = await db.getConnection();
	const [[result]] = await conn.execute(query, [email])
	
	if(!result)
		throw new Error('Usuario no registrado');
	
	const isValidPassword = await bcrypt.compare(password, result.password);
	if(!isValidPassword)
		throw new Error('Usuario o contraseña incorrectos');
	
	const token =  jwt.sign({id: result.id}, SECRET, {
		expiresIn: 60*60
	} )
	return {token: token, userId: result.id};

}

const existEmail = async(email) => {
	const conn = await db.getConnection();
	const query = `SELECT COUNT(*) as total FROM ${TABLE} WHERE email = ?`;
	const [[result]] = await conn.execute(query, [email]);
	if(result.total > 0)
		throw new Error('El email ya se encuentra registrado');
}

exports.existEmail = existEmail;
exports.register = register;
exports.login = login;