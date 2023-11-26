import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LocalSearch from "@/components/shared/search/LocalSearch"
import Filter from "@/components/shared/Filter"
import { HomePageFilters } from "@/constants/filters"
import HomeFilters from "@/components/home/HomeFilters"
import QuestionCard from "@/components/QuestionCard"

// const questionsOld = [
//   {
//     id: 1,
//     title:
//       "Getting stared with Remix but im am trying to make this title as long as possible",
//     tags: "NextJS",
//     author: "test_author",
//     upvotes: 1,
//     answers: 1,
//     views: 1,
//   },
//   {
//     id: 2,
//     title: "New JavaScript Framework",
//     tags: "NextJS",
//     author: "test_author",
//     upvotes: 1,
//     answers: 1,
//     views: 1,
//   },
// ]

// Generated by ChatGPT
const questions = [
  {
    _id: "1",
    title: "How to use TypeScript with React?",
    tags: [
      { _id: "t1", name: "TypeScript" },
      { _id: "t2", name: "React" },
    ],
    author: {
      _id: "a1",
      name: "John Doe",
      picture: "https://example.com/john-doe.jpg",
    },
    upvotes: 750000,
    views: 120,
    answers: [
      { answerId: "a1", text: "You can use tsx files for React components." },
      {
        answerId: "a2",
        text: "Make sure to install @types/react for type definitions.",
      },
    ],
    createdAt: new Date("2023-11-25T10:30:00Z"),
  },
  {
    _id: "2",
    title: "Best practices for Node.js development?",
    tags: [
      { _id: "t3", name: "Node.js" },
      { _id: "t4", name: "Best Practices" },
    ],
    author: {
      _id: "a2",
      name: "Jane Smith",
      picture: "https://example.com/jane-smith.jpg",
    },
    upvotes: 1100000,
    views: 90,
    answers: [
      {
        answerId: "a3",
        text: "Always use asynchronous methods to avoid blocking the event loop.",
      },
      {
        answerId: "a4",
        text: "Use npm scripts for common tasks like testing and building.",
      },
    ],
    createdAt: new Date("2023-11-24T14:45:00Z"),
  },
  {
    _id: "3",
    title: "How to deploy a React app to AWS?",
    tags: [
      { _id: "t5", name: "React" },
      { _id: "t6", name: "AWS" },
    ],
    author: {
      _id: "a3",
      name: "Alice Johnson",
      picture: "https://example.com/alice-johnson.jpg",
    },
    upvotes: 10,
    views: 80,
    answers: [
      {
        answerId: "a5",
        text: "You can use AWS Amplify for an easy deployment process.",
      },
      {
        answerId: "a6",
        text: "Configure AWS S3 for hosting and CloudFront for CDN.",
      },
    ],
    createdAt: new Date("2023-11-23T12:15:00Z"),
  },
  {
    _id: "4",
    title: "How to handle state in a Redux application?",
    tags: [
      { _id: "t7", name: "Redux" },
      { _id: "t8", name: "State Management" },
    ],
    author: {
      _id: "a4",
      name: "Bob Wilson",
      picture: "https://example.com/bob-wilson.jpg",
    },
    upvotes: 25,
    views: 150,
    answers: [
      {
        answerId: "a7",
        text: "Use actions and reducers to manage state changes.",
      },
      {
        answerId: "a8",
        text: "Consider using the useSelector and useDispatch hooks for integration.",
      },
    ],
    createdAt: new Date("2023-11-22T09:45:00Z"),
  },
]

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
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
        {questions.map((question) => (
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
