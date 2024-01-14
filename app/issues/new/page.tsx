"use client"

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  
  return (
    <form 
      className="max-w-xl space-y-3" 
      onSubmit={handleSubmit( async (data) => {
      await axios.post("/api/issues", data);
      router.push("/issues")
  })}>
    <TextField.Root>
      <TextField.Input placeholder="Title" {...register("title")} />
    </TextField.Root>
    <Controller 
      name="description"
      control={control}
      render={({field}) => <SimpleMDE placeholder="Description" {...field} /> }
    />
    <div className="space-x-3">
    <Button>Submit New Issue</Button>
    <Button variant="outline">
      <Link href="/issues">Cancel</Link>
      </Button> 
     </div>
  </form>
  )
};
export default NewIssuePage;
