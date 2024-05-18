import Answer from "@/components/forms/Answer"
import AllAnswers from "@/components/shared/AllAnswers"
import Metric from "@/components/shared/Metric"
import ParseHTML from "@/components/shared/ParseHTML"
import RenderTag from "@/components/shared/RenderTag"
import { getAnswers } from "@/lib/actions/answer.actions"
import { getQuestionsById } from "@/lib/actions/question.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils"
import { auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const page = async ({ params, searchParams }) => {
  // Wire up server action to get question by Id
  const result = await getQuestionsById({ questionId: params.id })
  console.log("result => ", result)

  // Get userId from Clerk and pass it to the Answer component
  const { userId: clerkId } = auth()

  let mongoUser

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId })
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5">
          <Link
            className="flex items-center justify-start"
            href={`/profile/${result.author.clerkId}`}
          >
            <Image
              src={result.author.picture}
              alt={result.author.username}
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              @{result.author.username}
            </p>
          </Link>
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked at ${getTimestamp(result.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light800"
          isAuthor={false}
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
          isAuthor={false}
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatAndDivideNumber(result.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
          isAuthor={false}
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        questionId={result._id}
        userId={JSON.stringify(mongoUser._id)}
        totalAnswers={result.answers.length}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  )
}

export default page
