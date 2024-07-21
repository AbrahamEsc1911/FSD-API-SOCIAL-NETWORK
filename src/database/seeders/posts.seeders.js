import 'dotenv/config';
import Posts from "../../entities/posts/posts.model.js"

export const postsSeeders = async () => {
    try {
        const posts = [
            {
                _id: '669bd63f721191eae6091056',
                post_message: 'Be yourself; everyone else is already taken',
                user: '669bd63f721191eae6091050',
                comments: ['669bd63f721191eae6091065'],
                likes: ['669bd63f721191eae6091051', '669bd63f721191eae6091052', '669bd63f721191eae6091053']
            },
            {
                _id: '669bd63f721191eae6091057',
                post_message: 'A room without books is like a body without a soul.',
                user: '669bd63f721191eae6091050',
                comments: ['669bd63f721191eae6091067'],
                likes: ['669bd63f721191eae6091052', '669bd63f721191eae6091053']
            },
            {
                _id: '669bd63f721191eae6091058',
                post_message: 'Be who you are and say what you feel, because those who mind dont matter, and those who matter dont mind.',
                user: '669bd63f721191eae6091050',
                likes: ['669bd63f721191eae6091052', '669bd63f721191eae6091053', '669bd63f721191eae6091055']
            },
            {
                _id: '669bd63f721191eae6091059',
                post_message: 'You only live once, but if you do it right, once is enough.',
                user: '669bd63f721191eae6091051',
                comments: ['669bd63f721191eae6091066'],
                likes: ['669bd63f721191eae6091054', '669bd63f721191eae6091053', '669bd63f721191eae6091052']
            },
            {
                _id: '669bd63f721191eae609105a',
                post_message: 'Be the change that you wish to see in the world.',
                user: '669bd63f721191eae6091051',
                likes: ['669bd63f721191eae6091054', '669bd63f721191eae6091053', '669bd63f721191eae6091052']
            },
            {
                _id: '669bd63f721191eae609105b',
                post_message: 'In three words I can sum up everything Ive learned about life: it goes on.',
                user: '669bd63f721191eae6091052',
                comments: ['669bd63f721191eae6091064'],
                likes: ['669bd63f721191eae6091054', '669bd63f721191eae6091053', '669bd63f721191eae6091051']
            },
            {
                _id: '669bd63f721191eae609105c',
                post_message: 'If you want to know what a mans like, take a good look at how he treats his inferiors, not his equals',
                user: '669bd63f721191eae6091052',
                likes: ['669bd63f721191eae6091050', '669bd63f721191eae6091053', '669bd63f721191eae6091051']
            },
            {
                _id: '669bd63f721191eae609105d',
                post_message: 'If you tell the truth, you dont have to remember anything.',
                user: '669bd63f721191eae6091053',
                comments: ['669bd63f721191eae6091069'],
                likes: ['669bd63f721191eae6091054', '669bd63f721191eae6091050', '669bd63f721191eae6091051']
            },
            {
                _id: '669bd63f721191eae609105e',
                post_message: 'A friend is someone who knows all about you and still loves you.',
                user: '669bd63f721191eae6091053',
                likes: ['669bd63f721191eae6091052', '669bd63f721191eae6091050', '669bd63f721191eae6091051']
            },
            {
                _id: '669bd63f721191eae609105f',
                post_message: 'To live is the rarest thing in the world. Most people exist, that is all.',
                user: '669bd63f721191eae6091053',
                comments: ['669bd63f721191eae609106a'],
                likes: ['669bd63f721191eae6091052', '669bd63f721191eae6091050', '669bd63f721191eae6091051', '669bd63f721191eae6091055']
            },
            {
                _id: '669bd63f721191eae6091060',
                post_message: 'Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.',
                user: '669bd63f721191eae6091054',
                likes: ['669bd63f721191eae6091050', '669bd63f721191eae6091051', '669bd63f721191eae6091055']
            },
            {
                _id: '669bd63f721191eae6091061',
                post_message: 'We accept the love we think we deserve.',
                user: '669bd63f721191eae6091055',
                comments: ['669bd63f721191eae6091068'],
                likes: ['669bd63f721191eae6091052', '669bd63f721191eae6091050', '669bd63f721191eae6091051', '669bd63f721191eae6091053']
            },
            {
                _id: '669bd63f721191eae6091062',
                post_message: 'Without music, life would be a mistake.',
                user: '669bd63f721191eae6091055',
                likes: ['669bd63f721191eae6091052', '669bd63f721191eae6091050', '669bd63f721191eae6091051', '669bd63f721191eae6091053']
            },
            {
                _id: '669bd63f721191eae6091063',
                post_message: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
                user: '669bd63f721191eae6091055',
                likes: ['669bd63f721191eae6091051', '669bd63f721191eae6091052', '669bd63f721191eae6091050']
            }
        ]

        await Posts.deleteMany({})

        await Posts.insertMany(posts)

        console.log('_________________')
        console.log('Posts seeders successfully')
        console.log('_________________')

    } catch (error) {
        console.log('_________________')
        console.log(error)
        console.log('_________________')
    }
}