import 'dotenv/config';
import { postsSeeders } from "./posts.seeders.js"
import { usersSeaders } from "./users.seeders.js"
import { commentsSeeders } from './comments.seeders.js';
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('DataBase Connected')
    })
    .catch(() => {
        console.log('Error connection Database')
    })

const runSeeders = async () => {
    try {
        console.log('================')
        console.log('starting seeders')
        await usersSeaders()
        await postsSeeders()
        await commentsSeeders()
        console.log('================')
        console.log('seeders done')

        mongoose.connection.close()
        console.log('Connection closed')
    } catch (error) {

    }
}

runSeeders()