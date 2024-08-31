/* eslint-disable no-empty */
// Action files for the Question domain object
"use server"

import User from "@/database/user.model"
import { connectToDatabase } from "../mongoose"
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types"
import Question from "@/database/question.model"
import { revalidatePath } from "next/cache"
import Answer from "@/database/answer.model"
import Tag from "@/database/tag.model"

export async function getUserById(params: any) {
  try {
    connectToDatabase()
    const { userId } = params

    const user = await User.findOne({ clerkId: userId })
    console.log(user)

    return user
  } catch (error) {
    // Handle the error here
    console.log(error)
    throw error
  }
}

export async function getAllUsers() {
  try {
    connectToDatabase()

    const users = await User.find()

    return { users }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase()
    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    if (!user) {
      throw new Error("User not found")
    }

    const totalQuestions = await Question.countDocuments({ author: user._id })
    const totalAnswers = await Answer.countDocuments({ author: user._id })

    return { user, totalQuestions, totalAnswers }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase()
    const { userId, page = 1, pageSize = 10 } = params

    const totalQuestions = await Question.countDocuments({ author: userId })

    const questions = await Question.find({ author: userId })
      .sort({ views: -1, upVotes: -1 })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId username picture",
      })
    // console.log("User Questions => ", questions)

    return { totalQuestions, questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase()
    const { userId, page = 1, pageSize = 10 } = params

    // const totalAnswers = await Answer.countDocuments({ author: userId })

    const answers = await Answer.find({ author: userId })
      .sort({ upVotes: -1 })
      .populate({
        path: "question",
        model: Question,
        select: "_id title upVotes tags",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId username picture",
      })
    console.log("User Answers => ", answers)

    return { answers }
  } catch (error) {
    console.log(error)
    throw error
  }
}

// User actions that will handle webhook events that come from Clerk

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase()

    const newUser = await User.create(userData)

    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase()

    const { clerkId, updateData, path } = params

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
    // push
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error("User not found")
    }

    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

    // delete user questions
    await Question.deleteMany({ author: user._id })

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase()

    const { userId, questionId, path } = params

    let updateQuery = {}

    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    const isQuestionSaved = user.saved.includes(questionId)

    if (isQuestionSaved) {
      updateQuery = { $pull: { saved: questionId } }
    } else {
      updateQuery = { $addToSet: { saved: questionId } }
    }

    await User.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
