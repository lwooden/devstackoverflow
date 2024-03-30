import Question from "@/components/forms/Question"
import { getUserById } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import React from "react"

const Page = async () => {
  const userId = "123456"
  if (!userId) redirect("/sign-in")

  const mongoUserId = await getUserById({ userId })

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <div>
        <Question mongoUserId={JSON.stringify(mongoUserId._id)} />
      </div>
    </div>
  )
}

export default Page
