import { Badge } from "../ui/badge"
import type { AtsAdvice } from "@/types/resume-review"


export default function AtsAdviceComponent({ ats }: { ats: AtsAdvice }) {
  return (
    <div className="flex flex-col gap-y-8">

      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium text-black text-base sm:text-lg">Buzzwords to Remove</h4>
        <div className="flex flex-wrap gap-2">
          {ats.buzzwords_to_remove.map((word, i) => (
            <Badge key={i} variant="outline" className="py-2 px-4 rounded-none text-xs sm:text-sm text-red-600 bg-red-50 border-red-100">{word}</Badge>
          ))}
          {ats.buzzwords_to_remove.length === 0 && <span className="text-xs sm:text-sm text-zinc-400 italic">None found</span>}
        </div>
      </div>

      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium text-black text-base sm:text-lg">Missing Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {ats.critical_keywords_missing.map((word, i) => (
            <Badge key={i} variant="outline" className="py-2 px-4 rounded-none text-xs sm:text-sm text-purple-600 bg-purple-50 border-purple-100">{word}</Badge>
          ))}
          {ats.critical_keywords_missing.length === 0 && <span className="text-xs sm:text-sm text-zinc-400 italic">All good</span>}
        </div>
      </div>
      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium text-black text-base sm:text-lg">Optimization Advice</h4>
        <p className="text-xs sm:text-base text-zinc-800">{ats.advice}</p>
      </div>
    </div>
  )
}