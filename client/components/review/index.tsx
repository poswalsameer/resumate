import { useState } from "react"
import ImpactComponent from "./impact"
import GeneralComponent from "./general"
import LanguageComponent from "./language"
import StructureComponent from "./structure"
import AtsAdviceComponent from "./ats-advice"
import SoftSkillsComponent from "./soft-skills"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fileAtom, jobDescriptionAtom, jobRoleAtom, parsedReviewAtom } from "@/store"
import { useAtom, useSetAtom } from "jotai"
import type { AtsAdvice, General, Impact, Language, ResumeScore, SoftSkills, Structure } from "@/types/resume-review"
import ResumeScoreComponent from "./resume-score"


export default function ResumeReviewComponent() {
  const [parsedReview, setParsedReview] = useAtom(parsedReviewAtom)
  const setJobDescription = useSetAtom(jobDescriptionAtom)
  const setJobRole = useSetAtom(jobRoleAtom)
  const setFile = useSetAtom(fileAtom)

  const [tab, setTab] = useState<string>("general")

  const general = parsedReview?.["1_general_impression"]
  const impact = parsedReview?.["2_quantifying_impact"]
  const ats = parsedReview?.["3_ats_and_keywords"]
  const sections = parsedReview?.["4_resume_sections"]
  const repetition = parsedReview?.["5_word_repetition"]
  const softSkills = parsedReview?.["6_soft_skills_check"]

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardContent className="flex flex-col">
        <ResumeScoreComponent assessment={parsedReview?.["7_final_assessment"] as ResumeScore} />

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
            {tab === "general" && <GeneralComponent general={general as General} />}
            {tab === "impact" && <ImpactComponent impact={impact as Impact} />}
            {tab === "ats" && <AtsAdviceComponent ats={ats as AtsAdvice} />}
            {tab === "structure" && <StructureComponent sections={sections as Structure} />}
            {tab === "language" && <LanguageComponent repetition={repetition as Language} />}
            {tab === "soft-skills" && <SoftSkillsComponent softSkills={softSkills as SoftSkills} />}
          </TabsContent>
        </Tabs>

        <Button
          onClick={() => {
            setParsedReview(null)
            setJobDescription("")
            setJobRole("")
            setFile(null)
          }}
          className="w-full py-7 text-lg font-medium rounded-none rounded-b-xl bg-purple-700 text-white hover:bg-purple-800 transition-all shadow-none gap-2"
        >
          Upload Another Resume
        </Button>

      </CardContent>
    </Card>
  )
}
