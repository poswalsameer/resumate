import { useState } from "react"
import Impact from "./review/impact"
import General from "./review/general"
import Language from "./review/language"
import Structure from "./review/structure"
import AtsAdvice from "./review/ats-advice"
import SoftSkills from "./review/soft-skills"
import ResumeScore from "./review/resume-score"
import { Button } from "@/components/ui/button"
import { ResumeReview } from "@/types/resume-review"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResumeReviewDisplayProps {
  review: ResumeReview
  onReset: () => void
}

export default function ResumeReviewDisplay({ review, onReset }: ResumeReviewDisplayProps) {
  const [tab, setTab] = useState<string>("general")

  const general = review["1_general_impression"]
  const impact = review["2_quantifying_impact"]
  const ats = review["3_ats_and_keywords"]
  const sections = review["4_resume_sections"]
  const repetition = review["5_word_repetition"]
  const softSkills = review["6_soft_skills_check"]
  const assessment = review["7_final_assessment"]

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardContent className="flex flex-col">
        <ResumeScore assessment={assessment} />

        <Tabs value={tab} onValueChange={setTab} className="w-full flex flex-col gap-0">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-transparent rounded-none gap-0 p-0">
            <TabsTrigger value="general" className="text-black border-y-2 border-l-2 border-r-2 border-muted-foreground/30 rounded-none data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none">General</TabsTrigger>
            <TabsTrigger value="impact" className="text-black border-y-2 border-l-0 border-r-2 border-muted-foreground/30 rounded-none data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none">Impact</TabsTrigger>
            <TabsTrigger value="ats" className="text-black border-y-2 border-l-0 border-r-2 border-muted-foreground/30 rounded-none data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none">ATS</TabsTrigger>
            <TabsTrigger value="structure" className="text-black border-y-2 border-l-0 border-r-2 border-muted-foreground/30 rounded-none data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none">Structure</TabsTrigger>
            <TabsTrigger value="language" className="text-black border-y-2 border-l-0 border-r-2 border-muted-foreground/30 rounded-none data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none">Words</TabsTrigger>
            <TabsTrigger value="soft-skills" className="text-black border-y-2 border-l-0 border-r-2 border-muted-foreground/30 rounded-none data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-none">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="border-2 border-muted-foreground/30 p-4 border-b-0 border-t-0">
            {tab === "general" && <General general={general} />}
            {tab === "impact" && <Impact impact={impact} />}
            {tab === "ats" && <AtsAdvice ats={ats} />}
            {tab === "structure" && <Structure sections={sections} />}
            {tab === "language" && <Language repetition={repetition} />}
            {tab === "soft-skills" && <SoftSkills softSkills={softSkills} />}
          </TabsContent>
        </Tabs>

        <Button
          onClick={onReset}
          className="w-full py-7 text-lg font-medium rounded-none rounded-b-xl bg-purple-700 text-white hover:bg-purple-800 transition-all shadow-none gap-2"
        >
          Upload Another Resume
        </Button>

      </CardContent>
    </Card>
  )
}
