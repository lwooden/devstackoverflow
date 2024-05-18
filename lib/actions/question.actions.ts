/* eslint-disable no-empty */
// Action files for the Question domain object
"use server"

import Question from "@/database/question.model"
import Tag from "@/database/tag.model"
import { connectToDatabase } from "../mongoose"
import User from "@/database/user.model"
import { revalidatePath } from "next/cache"
import { GetQuestionByIdParams } from "./shared.types"

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
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
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
