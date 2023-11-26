import Link from "next/link"
import React from "react"
import RenderTag from "./shared/RenderTag"
// import Image from "next/image"
import Metric from "./shared/Metric"
import { formatBigNumber, getTimestamp } from "@/lib/utils"

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

interface QuestionProps {
  _id: string
  title: string
  tags: {
    _id: string
    name: string
  }[]
  author: {
    _id: string
    name: string
    picture: string
  }
  upvotes: number
  views: number
  answers: Array<object>
  createdAt: Date
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  answers,
  views,
  createdAt,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {/* {String(createdAt)} */}
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/questions/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {/* Map over array of tags */}
        {tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            totalQuestions={0}
            showCount={false}
          />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        {/* Re-uesable Version */}
        <Metric
          imgUrl="/assets/icons/hamburger.svg"
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          textStyles="small-medium text-dark400_light800"
          href={`/profile/${author._id}`}
          isAuthor={true}
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatBigNumber(upvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
          isAuthor={false}
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={answers.length}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
          isAuthor={false}
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatBigNumber(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
          isAuthor={false}
        />
        {/* Handmade Version */}
        {/* <Link key={_id} href="/somewhere" className="flex-center gap-1">
          <Image
            alt="Chevron Right"
            width={16}
            height={16}
            className="rounded-full object-contain"
            src="/assets/icons/chevron-right.svg"
          />
          <p className="body-medium text-dark400_light700 flex items-center gap-1">
            {author.name}
            <span className="small-regular line-clamp-1 max-sm:hidden">
              - asked 30 days {String(createdAt)}
            </span>
          </p>
        </Link> */}
        {/* <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <div className="flex-center flex-wrap gap-1">
            <Image
              alt="Chevron Right"
              width={16}
              height={16}
              className="object-contain"
              src="/assets/icons/like.svg"
            />
            <p className="small-medium text-dark400_light800 flex items-center gap-1">
              {upvotes}
              <span className="small-regular line-clamp-1">Votes</span>
            </p>
          </div>
          <div className="flex-center flex-wrap gap-1">
            <Image
              alt="Chevron Right"
              width={16}
              height={16}
              className="object-contain"
              src="/assets/icons/message.svg"
            />
            <p className="small-medium text-dark400_light800 flex items-center gap-1">
              {answers.length}
              <span className="small-regular line-clamp-1">Answers</span>
            </p>
          </div>
          <div className="flex-center flex-wrap gap-1">
            <Image
              alt="Chevron Right"
              width={16}
              height={16}
              className="object-contain"
              src="/assets/icons/eye.svg"
            />
            <p className="small-medium text-dark400_light800 flex items-center gap-1">
              {views}
              <span className="small-regular line-clamp-1">Views</span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default QuestionCard
