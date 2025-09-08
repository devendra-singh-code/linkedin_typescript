import mongoose, { Document, Schema, Types } from 'mongoose'

export interface FriendRequest{
    sender: Schema.Types.ObjectId,
    status: "pending" | "accept" | "reject"
}
export interface User extends Document<Types.ObjectId>{
    username: string,
    password: string,
    email: string,
    full_name: string,
    verifyCode : string,
    isVerified: boolean,
    verifyCodeExpiry: Date,
    about? : string,
    headline?: string;
    cover_image?: string,
    profile_image?: string,
    location?: string,
    bio?: string,
    lastLogin: Date,
    followers: FriendRequest[],
    following: Types.ObjectId[]
}

const FriendSchema: Schema<FriendRequest> = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    status: {
        type: String,
        enum: ["pending" , "accept" , "reject"],
        default: "pending"
    }
}, {timestamps: true})

const UserSchema : Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    full_name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    verifyCode: {
        type: String,
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profile_image: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    headline: {
          type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    cover_image: {
        type: String,
        default: ""
    },
    followers: [FriendSchema],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    lastLogin: {
        type: Date,
        default: null
    }
}, {timestamps: true})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel