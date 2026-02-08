import type { Language } from "@/types/resume-review"

export default function LanguageComponent({ repetition }: { repetition: Language }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="font-medium text-xl text-zinc-900">
        Vocabulary Variety
      </div>

      {repetition.repetitive_words.length > 0 ? (
        <div className="border border-muted-foreground/30 rounded-none overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-transparent border-b border-muted-foreground/30 text-black text-lg font-medium">
              <tr>
                <th className="px-6 py-3 w-1/3 font-medium">Your Words</th>
                <th className="px-6 py-3 font-medium">Better Alternatives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted-foreground/30">
              {repetition.repetitive_words.map((word) => {
                const synonyms = repetition.better_synonyms[word] || []
                return (
                  <tr key={word} className="bg-transparent hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-zinc-900 capitalize">
                      {word}
                    </td>
                    <td className="px-6 py-3">
                      {synonyms.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {synonyms.map((syn) => (
                            <div
                              key={syn}
                              className="bg-purple-50 text-purple-700 font-medium hover:bg-purple-100 hover:text-purple-800 border-purple-100"
                            >
                              {syn}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-zinc-400 font-medium">-</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center bg-zinc-50 rounded-lg border border-zinc-100 border-dashed">
          <p className="text-zinc-500 italic">No repetitive words detected. Great job!</p>
        </div>
      )}
    </div>
  )
}
