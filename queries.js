
const Pool = require('pg').Pool

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})



const getProducts = (request, response) => {
    pool.query('SELECT * FROM Products', (error, results) => {
        if (error) {
            throw error
        }
    response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { firstname, lastname, email } = request.body
  
    pool.query('INSERT INTO users (firstname, lastname, email) VALUES ($1, $2)', [firstname, lastname, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
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
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}