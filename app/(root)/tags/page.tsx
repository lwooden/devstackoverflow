import LocalSearch from "@/components/shared/search/LocalSearch"
import { UserFilters } from "@/constants/filters"
import Filter from "@/components/shared/Filter"
import React from "react"
import { getAllTags } from "@/lib/actions/tag.actions"
import NoResult from "@/components/shared/NoResult"
import Link from "next/link"

const page = async () => {
  const results = await getAllTags({})
  console.log(results)
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          // containerClasses="hidden max-md:flex"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {results.tags.length > 0 ? (
          results.tags.map((tag) => (
            <Link
              className="shadow-light100_darknone"
              key={tag._id}
              href={`/tags/${tag._id}`}
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </>
  )
}

export default page
