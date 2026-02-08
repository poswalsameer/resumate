import { atom } from "jotai"
import { ResumeReview } from "@/types/resume-review"

export const parsedReviewAtom = atom<ResumeReview | null>(null)
export const jobDescriptionAtom = atom<string>("")
export const jobRoleAtom = atom<string>("")
export const fileAtom = atom<File | null>(null)
export const generalTabAtom = atom<ResumeReview | undefined>(undefined)
export const impactTabAtom = atom<ResumeReview | undefined>(undefined)
export const atsTabAtom = atom<ResumeReview | undefined>(undefined)
export const structureTabAtom = atom<ResumeReview | undefined>(undefined)
export const languageTabAtom = atom<ResumeReview | undefined>(undefined)
export const softSkillsTabAtom = atom<ResumeReview | undefined>(undefined)
export const assessmentTabAtom = atom<ResumeReview | undefined>(undefined)
