import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useForm } from "react-hook-form"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./form"
import { Input } from "./input"
import { Button } from "./button"

const meta = { title: "Base/Form", component: Form, tags: ["autodocs"] } satisfies Meta<typeof Form>
export default meta
type Story = StoryObj

function FormDemo() {
  const form = useForm({ defaultValues: { username: "" } })
  return (
    <Form {...form}>
      <form className="flex w-72 flex-col gap-5" onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="nelly" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const Default: Story = { render: () => <FormDemo /> }
