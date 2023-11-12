import React from "react"
import Image from "next/image"
import Link from "next/link"
import RenderTag from "../RenderTag"

const hotQuestions = [
  {
    _id: 1,
    title: "How do I use express as a custom server in NextJS?",
  },
  {
    _id: 2,
    title: "Can I get the course for free?",
  },
  {
    _id: 3,
    title: "Redux Toolkit Not Updating State as Expected",
  },
  {
    _id: 4,
    title: "Async/Await Function Not Handling Errors Properly",
  },
  {
    _id: 5,
    title: "How do I use express as a custom server in NextJS?",
  },
]

const popularTags = [
  {
    _id: 1,
    name: "NextJS",
    totalQuestions: 18,
  },
  {
    _id: 2,
    name: "Test",
    totalQuestions: 18,
  },
  {
    _id: 3,
    name: "React",
    totalQuestions: 12,
  },
  {
    _id: 4,
    name: "CSS",
    totalQuestions: 8,
  },
  {
    _id: 5,
    name: "Next JS",
    totalQuestions: 7,
  },
]

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      </div>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question) => {
          return (
            <Link
              key={question._id}
              href="/somewhere"
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                alt="Chevron Right"
                width={20}
                height={20}
                className="invert-colors"
                src="/assets/icons/chevron-right.svg"
              />
            </Link>
          )
        })}
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => {
            return (
              // lets utilize a reusable componet to render tags in the UI
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar
