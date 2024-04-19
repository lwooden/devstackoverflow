"use server"

import Tag from "@/database/tag.model"
import { connectToDatabase } from "../mongoose"
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types"

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
