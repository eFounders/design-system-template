import { redirect } from "next/navigation"

// The registry app exists to serve /r/*.json for `shadcn add @efounders/...`.
// The showcase lives in the Storybook, so the root just redirects there.
export default function Home() {
  redirect("https://design-system-template-storybook.vercel.app")
}
