export type ResumeReview = {
  "1_general_impression": General
  "2_quantifying_impact": Impact
  "3_ats_and_keywords": AtsAdvice
  "4_resume_sections": Structure
  "5_word_repetition": Language
  "6_soft_skills_check": SoftSkills
  "7_final_assessment": {
    overall_score: number
    score_breakdown: string
    closing_summary: string
  }
}

export type ResumeScore = {
  overall_score: number
}

export type General = {
  summary: string
  tone_check: string
}

export type Impact = {
  status: string
  feedback: string
  missing_opportunities: string
}

export type AtsAdvice = {
  buzzwords_to_remove: string[]
  critical_keywords_missing: string[]
  advice: string
}

export type Structure = {
  layout_critique: string
  sections_to_add: string[]
  sections_to_remove: string[]
}

export type Language = {
  variety_score: string
  repetitive_words: string[]
  better_synonyms: Record<string, string[]>
}

export type SoftSkills = {
  communication_leadership: {
    present: boolean
    feedback: string
  }
  teamwork_collaboration: {
    present: boolean
    feedback: string
  }
}
