"use client"

import { Button, TextArea, TextField } from "@radix-ui/themes";
import Link from "next/link";

const NewIssuePage = () => {
  return (
  <div className="max-w-xl space-y-3">
    <TextField.Root>
      <TextField.Input placeholder="Title" />
    </TextField.Root>
    <TextArea placeholder="Description" />
    {/* <div className=""> */}
    <Button>Submit New Issue</Button>
    {/* <Button variant="outline">
      <Link href="/issues">Cancel</Link>
      </Button> */}
    {/* </div> */}
  </div>
  )
};
export default NewIssuePage;
