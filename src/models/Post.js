import mongoose from "mongoose";
import User from "./User.js";
const { Schema } = mongoose;

const Post = new Schema ({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.ObjectId, ref: User,
        index: true
    },
    img: {
            data: Buffer,
            type: String
        },
    create_at: {
        type: Date, default: Date.now
    }

})


export default mongoose.model('Post', Post)