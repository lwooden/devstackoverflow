"use client"
import React, { useRef, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { AnswerSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Editor } from "@tinymce/tinymce-react"
import { useTheme } from "@/context/ThemeProvider"
import { Button } from "../ui/button"
import Image from "next/image"
import { createAnswer } from "@/lib/actions/answer.actions"
import { usePathname } from "next/navigation"
// import { Badge } from "lucide-react"
// import { Input } from "../ui/input"
// import Image from "next/image"

interface Props {
  question: string
  questionId: string
  authorId: string
}

// these props come from the parent component which is the question details page (higher order component)
const Answer = ({ question, questionId, authorId }: Props) => {
  const { mode } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()
  const editorRef = useRef(null)
  // see validation.ts for form Schemas powered by Zod
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { answer: "" },
  })

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true)

    try {
      await createAnswer({
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        content: values.answer,
        path: pathname,
      })

      // reset the form after submission
      form.reset()

      // clear the editor after submission
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setContent("")
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button className="btn light-border-2 inline-flex h-9 items-center justify-center gap-1.5 rounded-md border bg-slate-900 px-4 py-2.5 text-sm font-medium text-primary-500 shadow-none transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-primary-500 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300">
          <Image
            alt="stars"
            width={12}
            height={12}
            src="/assets/icons/stars.svg"
            className="object-contain"
          ></Image>{" "}
          Generate AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
          // className="space-y-8"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  {/* TODO: Add a editor comoponent */}
                  <Editor
                    apiKey="qpaffb5jag2bgkqx1ysintau40wj5foz64f83kd6qvv06f9y"
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor
                    }}
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
                      // TODO: enable this for the question form
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting Answer" : "Post Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Answer
