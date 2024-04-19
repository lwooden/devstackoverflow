import Link from "next/link"
import React from "react"
// import RenderTag from "./shared/RenderTag"
import Image from "next/image"
import { getTopInteractedTags } from "@/lib/actions/tag.actions"
import { Badge } from "@/components/ui/badge"
import RenderTag from "./shared/RenderTag"

interface Props {
  user: {
    _id: string
    clerkId: string
    picture: string
    name: string
    username: string
    // tags: {
    //   _id: string
    //   name: string
    // }[]
  }
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id })

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold">{user.name}</h3>
          <p className="text-dark500_light500 mt-2">@{user.username}</p>
        </div>
        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} tag={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No Tags</Badge>
          )}
        </div>
      </article>
    </Link>
  )
}

export default UserCard
