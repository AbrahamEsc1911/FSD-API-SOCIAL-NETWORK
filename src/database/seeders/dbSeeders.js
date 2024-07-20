import { postsSeeders } from "./posts.seeders.js"
import { usersSeaders } from "./users.seeders.js"

(async () => {

    await mongoose.connect(process.env.MONGO_URI, {})
    console.log('starting seeders')
    console.log('________________')
    await usersSeaders()
    await postsSeeders()
})