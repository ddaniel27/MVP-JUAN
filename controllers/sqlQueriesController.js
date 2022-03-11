require('dotenv').config()
const mysql = require('mysql')

const configConnection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
}

function createConnection() {
    return mysql.createConnection(configConnection)
}

function addNewSeller({code, name, phone, pic}, connection){
    return new Promise((resolve, reject) => {
        const addSellerQuery = `INSERT INTO profile (id, code, name, phone, pic) VALUES (NULL,'${code}', '${name}', '${phone}', '${pic}');`
        connection.query(addSellerQuery,(err, result) => {
            if (err) { reject(err) }
            else { resolve(result) }
        })
    })
}

function updateSeller({code, name, phone, pic}, connection){
    return new Promise((resolve, reject) => {
        if(!code){reject(new Error('No code was provided'))}
        const getQuery = `SELECT * FROM profile WHERE code = '${code}';`
        connection.query(getQuery,(err, result) => {
            if(err){ reject(err) }
            const myName = name ? name : result[0].name
            const myPhone = phone ? phone : result[0].Phone
            const myPic = pic ? pic : result[0].pic
            const updateSellerQuery = `UPDATE profile SET name = '${myName}', phone = '${myPhone}', pic = '${myPic}' WHERE code = '${code}';`
            connection.query(updateSellerQuery,(err, result) => {
                if(err){ reject(err) }
                else { resolve(result) }
            })
        })
    })
}

function getSellerByCode(code, connection){
    return new Promise((resolve, reject) => {
        const getSellerQuery = `SELECT * FROM profile WHERE code = '${code}';`
        connection.query(getSellerQuery,(err, result) => {
            if (err) { reject(err) }
            else { resolve(result) }
        })
    })
}

function deleteSellerByCode(code, connection){
    return new Promise((resolve, reject) => {
        const deleteSellerQuery = `DELETE FROM profile WHERE code = '${code}';`
        connection.query(deleteSellerQuery,(err, result) => {
            if (err) { reject(err) }
            else { resolve(result) }
        })
    })
}

module.exports = {
    createConnection,
    addNewSeller,
    updateSeller,
    getSellerByCode,
    deleteSellerByCode
}