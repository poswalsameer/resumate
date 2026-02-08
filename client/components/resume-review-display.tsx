import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ResumeReview } from "@/types/resume-review"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, AlertCircle, Smartphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResumeReviewDisplayProps {
  review: ResumeReview
  onReset: () => void
}

export default function ResumeReviewDisplay({ review, onReset }: ResumeReviewDisplayProps) {
  const general = review["1_general_impression"]
  const impact = review["2_quantifying_impact"]
  const ats = review["3_ats_and_keywords"]
  const sections = review["4_resume_sections"]
  const repetition = review["5_word_repetition"]
  const softSkills = review["6_soft_skills_check"]
  const assessment = review["7_final_assessment"]

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardContent className="flex flex-col gap-0 p-0 border">

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-white border-2 border-b-0 rounded-t-xl border-dashed border-muted-foreground/30">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Resume Audit Complete</h2>
            <p className="text-zinc-500">
              Your score: <span className="font-bold text-purple-600">{assessment.overall_score}/100</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-4 border-purple-100">
              <span className="text-xl font-bold text-purple-600">{assessment.overall_score}</span>
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="border grid w-full grid-cols-3 lg:grid-cols-6 border-transparent h-auto p-0 bg-white rounded-none">
            <TabsTrigger value="overview" className="rounded-none data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none">General</TabsTrigger>
            <TabsTrigger value="impact" className="rounded-none data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none">Impact</TabsTrigger>
            <TabsTrigger value="ats" className="rounded-none data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none">ATS</TabsTrigger>
            <TabsTrigger value="structure" className="rounded-none data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none">Structure</TabsTrigger>
            <TabsTrigger value="language" className="rounded-none data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none">Words</TabsTrigger>
            <TabsTrigger value="soft-skills" className="rounded-none data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-none">Skills</TabsTrigger>
          </TabsList>

          <div className="bg-white border-2 border-dashed border-muted-foreground/30 border-b-0 p-6 ">
            <TabsContent value="overview" className="mt-0 space-y-4 focus-visible:ring-0">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-zinc-900">
                  <Smartphone className="w-4 h-4 text-purple-600" /> Executive Summary
                </h4>
                <p className="text-sm text-zinc-600 leading-relaxed">{general.summary}</p>
              </div>
              <div className="pt-4 border-t border-dashed">
                <h4 className="font-semibold mb-2 text-zinc-900">Tone Analysis</h4>
                <p className="text-sm text-zinc-600">{general.tone_check}</p>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="mt-0 space-y-4 focus-visible:ring-0">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-zinc-900">Impact Assessment</h4>
                <Badge variant={impact.status === "Strong" ? "default" : impact.status === "Moderate" ? "secondary" : "destructive"}>
                  {impact.status}
                </Badge>
              </div>
              <p className="text-sm text-zinc-600 mb-4">{impact.feedback}</p>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <h5 className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" /> Missed Opportunities
                </h5>
                <p className="text-sm text-orange-700">{impact.missing_opportunities}</p>
              </div>
            </TabsContent>

            <TabsContent value="ats" className="mt-0 space-y-6 focus-visible:ring-0">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-zinc-900 mb-3 text-sm">Buzzwords to Remove</h4>
                  <div className="flex flex-wrap gap-2">
                    {ats.buzzwords_to_remove.map((word, i) => (
                      <Badge key={i} variant="outline" className="text-red-600 bg-red-50 border-red-100">{word}</Badge>
                    ))}
                    {ats.buzzwords_to_remove.length === 0 && <span className="text-sm text-zinc-400 italic">None found</span>}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 mb-3 text-sm">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {ats.critical_keywords_missing.map((word, i) => (
                      <Badge key={i} variant="outline" className="text-purple-600 bg-purple-50 border-purple-100">{word}</Badge>
                    ))}
                    {ats.critical_keywords_missing.length === 0 && <span className="text-sm text-zinc-400 italic">All good</span>}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-dashed">
                <h4 className="font-semibold text-zinc-900 mb-2 text-sm">Optimization Advice</h4>
                <p className="text-sm text-zinc-600">{ats.advice}</p>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="mt-0 space-y-4 focus-visible:ring-0">
              <p className="text-sm text-zinc-600">{sections.layout_critique}</p>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {sections.sections_to_add.length > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <h4 className="text-xs font-bold text-green-800 uppercase mb-2">Add Sections</h4>
                    <ul className="list-disc list-inside text-sm text-green-700">
                      {sections.sections_to_add.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {sections.sections_to_remove.length > 0 && (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <h4 className="text-xs font-bold text-red-800 uppercase mb-2">Remove Sections</h4>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {sections.sections_to_remove.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="language" className="mt-0 space-y-4 focus-visible:ring-0">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-zinc-900">Vocabulary Variety</h4>
                <span className="text-sm font-medium text-zinc-500">{repetition.variety_score}</span>
              </div>
              <div className="space-y-3">
                {repetition.repetitive_words.map((word) => (
                  <div key={word} className="flex items-center justify-between text-sm p-2 bg-zinc-50 rounded">
                    <span className="font-mono text-zinc-600 ">{word}</span>
                    <div className="flex gap-2">
                      {repetition.better_synonyms[word]?.slice(0, 2).map(syn => (
                        <span key={syn} className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded text-xs">{syn}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {repetition.repetitive_words.length === 0 && <p className="text-sm text-zinc-500 italic">No repetitive words detected.</p>}
              </div>
            </TabsContent>

            <TabsContent value="soft-skills" className="mt-0 grid md:grid-cols-2 gap-4 focus-visible:ring-0">
              <div className={`p-4 rounded-lg border ${softSkills.communication_leadership.present ? 'bg-green-50 border-green-100' : 'bg-zinc-50 border-zinc-100'}`}>
                <h4 className="font-semibold text-zinc-900 text-sm mb-1">Leadership</h4>
                <p className="text-xs text-zinc-600">{softSkills.communication_leadership.feedback}</p>
              </div>
              <div className={`p-4 rounded-lg border ${softSkills.teamwork_collaboration.present ? 'bg-green-50 border-green-100' : 'bg-zinc-50 border-zinc-100'}`}>
                <h4 className="font-semibold text-zinc-900 text-sm mb-1">Teamwork</h4>
                <p className="text-xs text-zinc-600">{softSkills.teamwork_collaboration.feedback}</p>
              </div>
            </TabsContent>

          </div>
        </Tabs>

        <Button
          onClick={onReset}
          className="w-full py-8 text-lg font-bold rounded-none rounded-b-xl bg-purple-700 text-white hover:bg-purple-800 transition-all shadow-none gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Upload Another Resume
        </Button>

      </CardContent>
    </Card>
  )
}
