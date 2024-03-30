"use client"

import React, { useRef, useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QuestionsSchema } from "@/lib/validation"
import { Editor } from "@tinymce/tinymce-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { createQuestion } from "@/lib/actions/question.actions"
import { useRouter, usePathname } from "next/navigation"
import router from "next/router"
import path from "path"

const type: any = "create"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

interface Props {
  mongoUserId: string
}

const Question = ({ mongoUserId }: Props) => {
  const editorRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent())
  //   }
  // }

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true) // prevent submit button from being clicked multiple times

    // contain all form data
    // navigate to home page

    try {
      // Calling Server Action
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId), // get from props
        path: pathname,
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      // eslint-disable-next-line no-empty
    } finally {
      setIsSubmitting(false)
    }

    console.log(values)
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault()

      const tagInput = e.target as HTMLInputElement
      const tagValue = tagInput.value.trim()
      console.log(tagValue)

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be at less than 15 characters",
          })
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue])
          tagInput.value = ""
          form.clearErrors("tags")
        }
      } else {
        form.trigger()
      }
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag)
    form.setValue("tags", newTags)
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
        // className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  //   placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Be specific.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explaination to you problem
              </FormLabel>
              <FormControl className="mt-3.5">
                {/* TODO: Add a editor comoponent */}
                <Editor
                  apiKey="qpaffb5jag2bgkqx1ysintau40wj5foz64f83kd6qvv06f9y"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "preview",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Introduce the problem and expand on what you entered for the
                title.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags"
                    // {...field}
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                </>
              </FormControl>
              {field.value.length > 0 && (
                <div className="flex-start mt-2.5 gap-2.5">
                  {field.value.map((tag: any) => (
                    <Badge
                      key={tag}
                      className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                      onClick={() => handleTagRemove(tag, field)}
                    >
                      {tag}{" "}
                      <Image
                        src="/assets/icons/close.svg"
                        alt="Close Icon"
                        width={12}
                        height={12}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <FormDescription className="body-regular mt-2.5 text-light-500 ">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default Question
