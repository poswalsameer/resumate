import type { ResumeScore } from "@/types/resume-review"

export default function ResumeScoreComponent({ assessment }: { assessment: ResumeScore }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-transparent border-2 border-b-0 rounded-t-xl border-muted-foreground/30">
      <div className="flex flex-col gap-y-2">
        <h2 className="text-2xl font-medium tracking-tight text-zinc-900">Resume Review Complete</h2>
        <p className="text-zinc-800 font-medium">
          Your score: <span className="font-medium text-purple-700">{assessment.overall_score}/100</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-4 border-purple-100">
          <span className="text-xl font-medium text-purple-700">{assessment.overall_score}</span>
          <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-purple-600"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${assessment.overall_score * 2.5} 251`}
              strokeLinecap="round"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}