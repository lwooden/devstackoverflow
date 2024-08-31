import Link from "next/link"
import React from "react"
// import Image from "next/image"
import Metric from "./shared/Metric"
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils"

// const questions = [
//   {
//     id: 1,
//     title:
//       "Getting stared with Remix but im am trying to make this title as long as possible",
//     tagName: "NextJS",
//     user: "test_user",
//     votes: 1,
//     answers: 1,
//     views: 1,
//   },
//   {
//     id: 2,
//     title: "New JavaScript Framework",
//     tagName: "NextJS",
//     user: "test_user",
//     votes: 1,
//     answers: 1,
//     views: 1,
//   },
// ]

interface AnswerProps {
  clerkId?: string | null
  _id: string
  title: string
  tags?: {
    _id: string
    name: string
  }[]
  author: {
    _id: string
    username: string
    picture: string
  }
  question?: {
    _id: string
  }
  upvotes: string[]
  createdAt: Date
}

const AnswerCard = ({
  clerkId,
  _id,
  title,
  tags,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerProps) => {
  return (
    <Link
      href={`/question/${question?._id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.username}
          title={` - asked ${getTimestamp(createdAt)}`}
          textStyles="small-medium text-dark400_light800"
          href={`/profile/${author._id}`}
          isAuthor={true}
        />
        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
            isAuthor={false}
          />
        </div>
      </div>
    </Link>
  )
}

export default AnswerCard
