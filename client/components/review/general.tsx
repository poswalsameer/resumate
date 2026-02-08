import type { General } from "@/types/resume-review"

export default function GeneralComponent({ general }: { general: General }) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="w-full flex flex-col ">
        <h4 className="text-lg sm:text-xl font-medium text-zinc-900">
          Summary
        </h4>
        <p className="text-sm sm:text-base text-zinc-800 ">{general.summary}</p>
      </div>
      <div className="flex flex-col ">
        <h4 className="text-lg sm:text-xl font-medium text-zinc-900">
          Tone Analysis
        </h4>
        <p className="text-sm sm:text-base text-zinc-800 ">{general.tone_check}</p>
      </div>
    </div>
  )
}