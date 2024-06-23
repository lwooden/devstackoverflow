import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LocalSearch from "@/components/shared/search/LocalSearch"
import Filter from "@/components/shared/Filter"
import { HomePageFilters } from "@/constants/filters"
import HomeFilters from "@/components/home/HomeFilters"
import QuestionCard from "@/components/QuestionCard"
import { getSavedQuestions } from "@/lib/actions/question.actions"
import { auth } from "@clerk/nextjs"

export default async function Home() {
  // Get userId from Clerk
  const { userId } = auth()

  if (!userId) return null

  const result = await getSavedQuestions({ clerkId: userId })
  //   console.log(result)

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask A Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result!.questions.map((question) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))}
      </div>
    </>
  )
}
