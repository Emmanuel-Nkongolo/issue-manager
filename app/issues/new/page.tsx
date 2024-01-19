"use client"

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod"
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const [ isSubmitting, setSubmitting ] = useState(false)
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState("")
  const onSubmit = handleSubmit( async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false)
      setError("An unexpected error occured.")
    }
})
  
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    <form 
      className="max-w-xl space-y-3" 
      onSubmit={onSubmit}>
    <TextField.Root>
      <TextField.Input placeholder="Title" {...register("title")} />
    </TextField.Root>
    <ErrorMessage>
      {errors.title?.message}
    </ErrorMessage>
    <Controller 
      name="description"
      control={control}
      render={({field}) => <SimpleMDE placeholder="Description" {...field} /> }
    />
    <ErrorMessage>
      {errors.description?.message}
    </ErrorMessage>
    <div className="space-x-3">
    <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
    <Button variant="outline">
      <Link href="/issues">Cancel</Link>
      </Button> 
     </div>
  </form>
  </div>
  )
};
export default NewIssuePage;
