export interface ResumeReview {
  "1_general_impression": {
    summary: string
    tone_check: string
  }
  "2_quantifying_impact": {
    status: string
    feedback: string
    missing_opportunities: string
  }
  "3_ats_and_keywords": {
    ats_compatibility_score: string
    buzzwords_to_remove: string[]
    critical_keywords_missing: string[]
    advice: string
  }
  "4_resume_sections": {
    layout_critique: string
    sections_to_add: string[]
    sections_to_remove: string[]
  }
  "5_word_repetition": {
    repetitive_words: string[]
    variety_score: string
    better_synonyms: Record<string, string[]>
  }
  "6_soft_skills_check": {
    communication_leadership: {
      present: boolean
      feedback: string
    }
    teamwork_collaboration: {
      present: boolean
      feedback: string
    }
  }
  "7_final_assessment": {
    overall_score: number
    score_breakdown: string
    closing_summary: string
  }
}
