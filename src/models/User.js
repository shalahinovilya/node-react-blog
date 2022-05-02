import mongoose from "mongoose";

const { Schema } = mongoose;

const User = new Schema ({

    username:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    register_at: {
        type: Date, default: Date.now
    }

})

// User.virtual("posts", {
//     ref: "Post",
//     foreignField: "author",
//     localField: "_id"
// });

export default mongoose.model('User', User)