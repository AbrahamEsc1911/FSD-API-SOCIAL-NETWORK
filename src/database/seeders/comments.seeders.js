import 'dotenv/config';
import mongoose from "mongoose"
import Comments from "../../entities/comments/comments.model.js"

export const commentsSeeders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})

        const comments = [
            {
                _id: '669bd63f721191eae6091064',
                message: 'Yesss, absolutely true, im agree with that bro.',
                post: '669bd63f721191eae609105b',
                user: '669bd63f721191eae6091052'
            },
            {
                _id: '669bd63f721191eae6091065',
                message: 'beatyfull this mate',
                post: '669bd63f721191eae6091056',
                user: '669bd63f721191eae6091050'
            },
            {
                _id: '669bd63f721191eae6091066',
                message: 'hey, can we talk in DM?',
                post: '669bd63f721191eae6091059',
                user: '669bd63f721191eae6091051'
            },
            {
                _id: '669bd63f721191eae6091067',
                message: 'books is one of our greates invents',
                post: '669bd63f721191eae6091057',
                user: '669bd63f721191eae6091050'
            },
            {
                _id: '669bd63f721191eae6091068',
                message: 'thats true, we acept what we feel we deserve',
                post: '669bd63f721191eae6091061',
                user: '669bd63f721191eae6091055'
            },
            {
                _id: '669bd63f721191eae6091069',
                message: 'walk in life with truth',
                post: '669bd63f721191eae609105d',
                user: '669bd63f721191eae6091053'
            },
            {
                _id: '669bd63f721191eae609106a',
                message: 'live your live knowing youll die some day',
                post: '669bd63f721191eae609105f',
                user: '669bd63f721191eae6091053'
            }
        ]

        await Comments.deleteMany({})

        await Comments.insertMany(comments)

        console.log('____________________')
        console.log('comments seeders successfully')
        console.log('____________________')

    } catch (error) {
        console.log('____________________')
        console.log(error)
        console.log('____________________')
    } finally {
        await mongoose.connection.close()
    }
}

commentsSeeders()