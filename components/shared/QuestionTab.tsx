import { getUserQuestions } from "@/lib/actions/user.actions"
import React from "react"
import QuestionCard from "../QuestionCard"
import { SearchParamsProps } from "@/types"

interface Props extends SearchParamsProps {
  userId: string
  clerkId?: string | null
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId })
  console.log("Question Tab Results => ", result)
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          clerkId={clerkId}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          answers={question.answers}
          views={question.views}
          createdAt={question.createdAt}
        />
      ))}
    </>
  )
}

export default QuestionTab
