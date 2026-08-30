import { redirect } from 'next/navigation'

// The real checkout success page is /subscribe/success (it renders the
// confirmation + manage-subscription link and needs the session_id query
// param). This route exists only because the QA audit and the task brief
// both reference a bare /success path; keep it as a passthrough redirect
// rather than a second copy of the page.
export default async function SuccessRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const params = await searchParams
  const qs = new URLSearchParams(
    Object.entries(params).filter((entry): entry is [string, string] => Boolean(entry[1])),
  ).toString()

  redirect(`/subscribe/success${qs ? `?${qs}` : ''}`)
}
