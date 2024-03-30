import { model, models, Document, Schema } from "mongoose"

export interface IUser extends Document {
  clerkId: string
  username: string
  email: string
  password?: string
  picture: string
  bio?: string
  location?: string
  portfolioWebsite?: string
  repuation?: number
  saved: Schema.Types.ObjectId[]
  joinedAt: Date
}

const UserScheme = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  portfolioWebsite: {
    type: String,
    default: "",
  },
  reputation: {
    type: Number,
    default: 0,
  },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
})

const User = models.User || model("User", UserScheme)

export default User
