import type { Impact } from "@/types/resume-review"

export default function Impact({ impact }: { impact: Impact }) {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium text-xl text-black">Impact Assessment</h4>
        <p className="text-base text-zinc-800 font-normal">{impact.feedback}</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-xl font-medium text-black">
          Missed Opportunities
        </div>
        <div className="text-base text-zinc-800 font-normal">{impact.missing_opportunities}</div>
      </div>
    </div>
  )
}