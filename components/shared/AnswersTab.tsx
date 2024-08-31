import { getUserAnswers } from "@/lib/actions/user.actions"
import { SearchParamsProps } from "@/types"
import React from "react"
import AnswerCard from "../AnswerCard"

interface Props extends SearchParamsProps {
  userId: string
  clerkId?: string | null
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId })
  console.log("Answer Tab Result => ", result.answers)
  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          title={answer.question.title}
          author={answer.author}
          upvotes={answer.upvotes}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  )
}

export default AnswersTab
