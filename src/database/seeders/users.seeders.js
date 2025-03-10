import 'dotenv/config';
import bcrypt from 'bcrypt'
import Users from '../../entities/users/users.model.js';

export const usersSeaders = async () => {
    try {
        const users = [
            {
                _id: '669bd63f721191eae6091050',
                name: 'admin',
                email: 'admin@admin.com',
                password: '12345678',
                phone: '3456457898',
                city: 'New York',
                born: '18-09-1998',
                roles: 'admin',
                posts: ['669bd63f721191eae6091056', '669bd63f721191eae6091057', '669bd63f721191eae6091058'],
                followers: ['669bd63f721191eae6091051'],
                following: ['669bd63f721191eae6091051', '669bd63f721191eae6091052', '669bd63f721191eae6091053'],
                comments: ['669bd63f721191eae6091064', '669bd63f721191eae6091066']
            },
            {
                _id: '669bd63f721191eae6091051',
                name: 'user',
                email: 'user@user.com',
                password: '12345678',
                phone: '3456457898',
                city: 'Madrid',
                born: '18-09-1998',
                roles: 'user',
                posts: ['669bd63f721191eae6091059', '669bd63f721191eae609105a'],
                followers: ['669bd63f721191eae6091050', '669bd63f721191eae6091053'],
                following: ['669bd63f721191eae6091050', '669bd63f721191eae6091052', '669bd63f721191eae6091053'],
                comments: ['669bd63f721191eae6091065']
            },
            {
                _id: '669bd63f721191eae6091052',
                name: 'Andrea Puij',
                email: 'andrea@andrea.com',
                password: '12345678',
                phone: '3456457898',
                city: 'Barcelona',
                born: '18-09-1998',
                roles: 'user',
                posts: ['669bd63f721191eae609105b', '669bd63f721191eae609105c'],
                followers: ['669bd63f721191eae6091050', '669bd63f721191eae6091053'],
                following: ['669bd63f721191eae6091050', '669bd63f721191eae6091051', '669bd63f721191eae6091053'],
                comments: ['669bd63f721191eae6091067']
            },
            {
                _id: '669bd63f721191eae6091053',
                name: 'peter holms',
                email: 'pedro@pedro.com',
                password: '12345678',
                phone: '3456457898',
                city: 'Amsterdan',
                born: '18-09-1998',
                roles: 'user',
                posts: ['669bd63f721191eae609105d', '669bd63f721191eae609105e', '669bd63f721191eae609105f'],
                followers: ['669bd63f721191eae6091050', '669bd63f721191eae6091052'],
                following: ['669bd63f721191eae6091050', '669bd63f721191eae6091051', '669bd63f721191eae6091052', '669bd63f721191eae6091054'],
                comments: ['669bd63f721191eae6091068']
            },
            {
                _id: '669bd63f721191eae6091054',
                name: 'camila Worken',
                email: 'camila@camila.com',
                password: '12345678',
                phone: '3456457898',
                city: 'Berlin',
                born: '18-09-1998',
                roles: 'user',
                posts: ['669bd63f721191eae6091060'],
                followers: ['669bd63f721191eae6091050', '669bd63f721191eae6091052', '669bd63f721191eae6091053'],
                following: ['669bd63f721191eae6091050', '669bd63f721191eae6091051', '669bd63f721191eae6091052', '669bd63f721191eae6091054'],
                comments: ['669bd63f721191eae6091069']
            },
            {
                _id: '669bd63f721191eae6091055',
                name: 'Alejandro Peget',
                email: 'alejandro@alejandro.com',
                password: '12345678',
                phone: '3456457898',
                city: 'Paris',
                born: '18-09-1998',
                roles: 'user',
                posts: ['669bd63f721191eae6091061', '669bd63f721191eae6091062', '669bd63f721191eae6091063'],
                followers: ['669bd63f721191eae6091050', '669bd63f721191eae6091052', '669bd63f721191eae6091053'],
                following: ['669bd63f721191eae6091051', '669bd63f721191eae6091053', '669bd63f721191eae6091052', '669bd63f721191eae6091054'],
                comments: ['669bd63f721191eae609106a']
            }
        ]

        for (let user of users) {
            user.password = bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS))
        }

        await Users.deleteMany({})

        await Users.insertMany(users);

        console.log('___________________')
        console.log('users seeders successfully')
        console.log('___________________')

    } catch (error) {
        console.log('___________________')
        console.log(error)
        console.log('___________________')
    }
}