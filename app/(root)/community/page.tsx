import LocalSearch from "@/components/shared/search/LocalSearch"
import { UserFilters } from "@/constants/filters"
import Filter from "@/components/shared/Filter"
import React from "react"
import { getAllUsers } from "@/lib/actions/user.actions"
import UserCard from "@/components/UserCard"

const page = async () => {
  const results = await getAllUsers()
  console.log(results)
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for users..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          // containerClasses="hidden max-md:flex"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4"></section>
      {results.users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </>
  )
}

export default page
