import express from 'express';
import 'dotenv/config';
import { dbConection } from './database/db.js';
import { router } from './routers.js'

const app = express()

const PORT = process.env.PORT || 2030

app.use(express.json())

app.get('/healthy', (req, res) => {
    res.json(
        {
            success: true,
            message: 'server is healthy'
        }
    )
})

app.use('/api/v1', router)

dbConection()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`server is runnig in ${PORT}`)
        })
    })
    .catch(error => {
        console.log('error connection database: ' + error.message)
    }
    )