import type { Impact } from "@/types/resume-review"

export default function ImpactComponent({ impact }: { impact: Impact }) {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium text-lg sm:text-xl text-black">Impact Assessment</h4>
        <p className="text-sm sm:text-base text-zinc-800 font-normal">{impact.feedback}</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="text-lg sm:text-xl font-medium text-black">
          Missed Opportunities
        </div>
        <div className="text-sm sm:text-base text-zinc-800 font-normal">{impact.missing_opportunities}</div>
      </div>
    </div>
  )
}