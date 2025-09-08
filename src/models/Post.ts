import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";

export interface Post extends Document {
    createdBy: Schema.Types.ObjectId,
    createdAt: Date,
    content: string,
    post_image: string,
    post_video: string,
    comments: Types.Array<Types.ObjectId>,
    likes : Types.Array<Types.ObjectId>
}


export interface Comments {
    comments: string,
    createdBy: Schema.Types.ObjectId,
    createdAt: Date
}

const commentsSchema : Schema<Comments> = new Schema({
    comments: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const PostSchema: Schema<Post> =  new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: ""
    },
    post_image: {
        type: String,
        default: ""
    },
    post_video: {
        type: String,
        default: ""
    },
    comments : [commentsSchema],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]

})

const PostModel = (mongoose.models.Posts as mongoose.Model<Post>)  || mongoose.model<Post>("Posts", PostSchema)

export default PostModel