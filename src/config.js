// import dotenv from 'dotenv'
// dotenv.config()
// console.log('env', process.env)

export default {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000/api'
    // API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'https://tranquil-badlands-46681.herokuapp.com/api'
}

