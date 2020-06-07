
const Pool = require('pg').Pool

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
    connectionString: isProduction ? process.env.HEROKU_POSTGRESQL_BRONZE_URL : connectionString
})



const getProducts = (request, response) => {
    pool.query('SELECT * FROM Products', (error, results) => {
        if (error) {
            throw error
        }
    response.status(200).json(results.rows)
    })
}

const getProductById = (request, response) => {
    const gtin = parseInt(request.params.id)
  
    pool.query('SELECT * FROM Products WHERE gtin = $1', [gtin], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createProduct = (request, response) => {
    const { gtin, ingredients, allergens, name } = request.body
  
    pool.query('INSERT INTO Products (gtin, ingredients, allergens, name) VALUES ($1, $2, $3, $4)', [gtin, ingredients, allergens, name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Product added with ID: ${results.insertId}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstname, lastname, email } = request.body
  
    pool.query(
        'UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE id = $4',
        [firstname, lastname, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateUser,
    deleteUser,
}