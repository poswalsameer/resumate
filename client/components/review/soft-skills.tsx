import type { SoftSkills } from "@/types/resume-review"

export default function SoftSkillsComponent({ softSkills }: { softSkills: SoftSkills }) {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium text-black text-base sm:text-lg">Leadership</h4>
        <p className="text-sm sm:text-base text-zinc-800 font-normal">{softSkills.communication_leadership.feedback}</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <h4 className="font-medium text-black text-base sm:text-lg">Teamwork</h4>
        <p className="text-sm sm:text-base text-zinc-800 font-normal">{softSkills.teamwork_collaboration.feedback}</p>
      </div>
    </div>
  )
}