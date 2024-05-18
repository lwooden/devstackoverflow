"use server"

import Answer from "@/database/answer.model"
import { revalidatePath } from "next/cache"
import { connectToDatabase } from "../mongoose"
import { CreateAnswerParams, GetAnswersParams } from "./shared.types"
import Question from "@/database/question.model"

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase()

    const { questionId } = params

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId username picture")
      .sort({ createdAt: -1 })

    console.log("all answers =>", answers)

    return { answers }
  } catch (error) {
    console.log("error =>", error)
    throw error
  }
}

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase()

    // Destructure the values object that will be passed from the form
    const { author, question, content, path } = params

    const newAnswer = await Answer.create({
      author,
      question,
      content,
    })
    // add the new answer to the question answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    })

    console.log("answer =>", newAnswer)

    revalidatePath(path)
  } catch (error) {
    // Handle the error here
  }
}
