import type { Structure } from "@/types/resume-review"

export default function Structure({ sections }: { sections: Structure }) {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="text-base font-medium text-black">{sections.layout_critique}</div>

      {sections.sections_to_add.length > 0 && (
        <div className="flex flex-col gap-y-1">
          <div className="text-xl font-medium text-black">Add Sections</div>
          <ul className="list-disc list-inside text-base text-zinc-800">
            {sections.sections_to_add.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
      {sections.sections_to_remove.length > 0 && (
        <div className="flex flex-col gap-y-1">
          <div className="text-xl font-medium text-black">Remove Sections</div>
          <ul className="list-disc list-inside text-base text-zinc-800">
            {sections.sections_to_remove.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}