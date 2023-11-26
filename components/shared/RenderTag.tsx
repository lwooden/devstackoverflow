import Link from "next/link"
import React from "react"
import { Badge } from "../ui/badge"

// define the interface
interface Props {
  _id: string
  name: string
  totalQuestions: number
  showCount?: boolean
}

// destructure the props and mark it as type Props for type safety
const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link key={_id} href="/somewhere" className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  )
}

export default RenderTag
