const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()


const app = express()

app.use(cors())

app.use(express.json())

app.post('/solve', (req, res) => {
    console.log(req.body)
    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            "puzzle": req.body.submission
        }
    };
    
    axios.request(options).then((response) => {
        console.log(response.data);
        res.json(response.data)
    }). catch((error) => {
        console.error(error);
    })
})

app.listen(PORT, ()=> console.log(`server listening on PORT ${PORT}`))