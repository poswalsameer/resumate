import { useAtom } from "jotai"
import { FileUp } from "lucide-react"
import ResumeReviewComponent from "../review"
import ThinkingProcess from "../review/thinking-process"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ResumeReview } from "@/types/resume-review"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef, DragEvent, ChangeEvent } from "react"
import { parsedReviewAtom, jobDescriptionAtom, jobRoleAtom, fileAtom } from "@/store"


export default function UploadResume() {
  const [jobRole, setJobRole] = useAtom(jobRoleAtom)
  const [parsedReview, setParsedReview] = useAtom(parsedReviewAtom)
  const [jobDescription, setJobDescription] = useAtom(jobDescriptionAtom)
  const [file, setFile] = useAtom(fileAtom)

  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [thinkingText, setThinkingText] = useState<string>("")
  const [isThinkingDone, setIsThinkingDone] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      }
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile)
      }
    }
  }

  async function handleReviewResume() {
    if (!file) return

    setIsLoading(true)
    setParsedReview(null)
    setThinkingText("")
    setIsThinkingDone(false)

    let fullReviewText = ""

    try {
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("jobDescription", jobDescription)
      formData.append("jobRole", jobRole)

      const response = await fetch(`http://localhost:5000/api/v1/review-resume`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")

          let currentEvent = null

          for (const line of lines) {
            if (line.startsWith("event: ")) {
              currentEvent = line.slice(7).trim()
            } else if (line.startsWith("data: ")) {
              const dataStr = line.slice(6).trim()
              if (!dataStr) continue

              try {
                const data = JSON.parse(dataStr)
                if (currentEvent === "reasoning" && data.text) {
                  setThinkingText((prev) => prev + data.text)
                } else if (currentEvent === "content" && data.text) {
                  setIsThinkingDone(true)
                  fullReviewText += data.text
                } else if (!currentEvent && data.text) {
                  fullReviewText += data.text
                }
              } catch (e) {
                console.error("Error parsing JSON from stream", e)
              }
            }
          }
        }
      }

      // Attempt to parse the accumulated JSON
      try {
        // Clean up markdown code blocks if present
        const cleanedText = fullReviewText
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim()
        const jsonResponse = JSON.parse(cleanedText) as ResumeReview
        setParsedReview(jsonResponse)
      } catch (parseError) {
        console.error("Failed to parse final JSON:", parseError)
        console.log("Raw text:", fullReviewText)
      }

    } catch (error) {
      console.error(`Error while reviewing resume`, error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <ThinkingProcess thinkingText={thinkingText} isThinkingDone={isThinkingDone} />
  if (parsedReview) return <ResumeReviewComponent />

  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardContent className="flex flex-col gap-6">
        <div className="">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-t-xl cursor-pointer transition-colors ${isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/30 bg-card hover:bg-muted/50'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleInputChange}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <FileUp className="w-6 h-6 text-muted-foreground" />
              </div>

              <div className="text-center">
                {file ? (
                  <>
                    <p className="text-lg font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click or drag to replace
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium text-foreground">
                      Drop your PDF here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Max size: 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full gap-0">
            {/* JOB DESCRIPTION */}
            <div className="relative group w-1/2">
              <Input
                id="job-desc"
                type="text"
                placeholder="Job Description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="bg-white border-2 border-t-0 border-b-0 border-r-0 border-dashed border-muted-foreground/30 text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:border-purple-500 focus-visible:border-solid rounded-none h-12 px-4 py-8"
              />
            </div>

            {/* JOB ROLE */}
            <div className="relative group w-1/2">
              <Input
                id="job-role"
                type="text"
                placeholder="Job Role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="bg-white border-2 border-t-0 border-b-0 border-dashed border-muted-foreground/30 text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:border-purple-500 focus-visible:border-solid rounded-none h-12 px-4 py-8"
              />
            </div>
          </div>

          <Button
            onClick={handleReviewResume}
            disabled={isLoading || !file}
            className="w-full py-8 text-lg font-bold rounded-none rounded-b-xl bg-purple-700 text-white hover:bg-purple-800 transition-all shadow-none"
          >
            {isLoading ? "Reviewing..." : "Start Review"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
