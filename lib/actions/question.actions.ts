/* eslint-disable no-empty */
// Action files for the Question domain object
"use server"

import Question from "@/database/question.model"
import Tag from "@/database/tag.model"
import { connectToDatabase } from "../mongoose"
import User from "@/database/user.model"
import { revalidatePath } from "next/cache"
import {
  GetQuestionByIdParams,
  GetQuestionsByTagIdParams,
  GetSavedQuestionsParams,
  QuestionVoteParams,
} from "./shared.types"

export async function getQuestions() {
  try {
    connectToDatabase()
    const questions = await Question.find()
      .populate({ path: "tags", model: Tag }) // Populate the tag field with actual tag data; not just a object reference
      .populate({ path: "author", model: User }) // Populate the author field with actual author data; not just a object reference
      .sort({ createdAt: -1 }) // Sort by most recent questions first

    console.log("questions =>", questions)

    return { questions }
  } catch (error) {
    // Handle the error here
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase()
    const { clerkId } = params

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId username picture" },
      ],
    })

    // console.log("user =>", user)

    const savedQuestions = user.saved

    return { questions: savedQuestions }
  } catch (error) {}
}

export async function getQuestionsById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase()
    const { questionId } = params
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" }) // Populate the tag field with actual tag data; not just a object reference
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId username picture",
      }) // Populate the author field with actual author data; not just a object reference

    console.log("question =>", question)

    return question
  } catch (error) {
    // Handle the error here
  }
}

export async function createQuestion(params: any) {
  try {
    connectToDatabase()

    // Destructure the values object that will be passed from the form
    const { title, content, tags, author, path } = params

    const question = await Question.create({
      title,
      content,
      author,
    })

    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      )

      tagDocuments.push(existingTag._id)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    })

    revalidatePath(path)
  } catch (error) {
    // Handle the error here
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase()

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    })

    if (!question) {
      throw new Error("Question not found")
    }

    // TODO: Add logic to update authors reputation for upvoting

    revalidatePath(path)
  } catch (error) {
    console.log("error =>", error)
    throw error
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase()

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    })

    if (!question) {
      throw new Error("Question not found")
    }

    // TODO: Add logic to update authors reputation for upvoting

    revalidatePath(path)
  } catch (error) {
    console.log("error =>", error)
    throw error
  }
}
