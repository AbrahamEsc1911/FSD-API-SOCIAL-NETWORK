import { usersSeaders } from "./users.seeders.js"

(async () => {
    console.log('starting seeders')
    await usersSeaders()
})