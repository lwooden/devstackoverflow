"use server"

import Tag, { ITag } from "@/database/tag.model"
import { connectToDatabase } from "../mongoose"
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types"
import Question from "@/database/question.model"
import { FilterQuery } from "mongoose"
import User from "@/database/user.model"

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase()

    const tags = await Tag.find({})

    return { tags }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase()

    const { tagId } = params

    // define a filter to pass in the query to get a tag by id and all of the questions related to that tag
    const tagFilter: FilterQuery<ITag> = { _id: tagId }

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId username picture" },
      ],
    })

    // console.log(tag)

    if (!tag) {
      throw new Error("Tag not found")
    }

    const questions = tag.questions

    // console.log(questions)

    return { tagTitle: tag.name, questions }
  } catch (error) {}
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase()

    // const { userId } = params
    // const user = await User.findById(userId)

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}
