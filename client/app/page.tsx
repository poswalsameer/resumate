"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileUp, Github, Linkedin, Twitter } from "lucide-react"
import { useState, useRef, DragEvent, ChangeEvent } from "react"

export default function Home() {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        setFileName(file.name)
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setFileName(file.name)
      }
    }
  }
  return (
    <div className="min-h-screen bg-[#FAFAF9] w-full flex flex-col items-center justify-center font-sans">

      <div className="h-full w-full flex flex-col gap-y-6 mx-auto max-w-5xl p-8">

        {/* Header Section */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter text-black">
            Review <span className="text-purple-800">Resumes</span>, on the go
          </h1>
          <p className="text-xl md:text-3xl font-normal tracking-tight text-black">
            No DB. No Saves. Instant Feedback.
          </p>
        </div>

        {/* Main Card */}
        <Card className="w-full bg-transparent border-none shadow-none">
          <CardContent className="flex flex-col gap-6 ">
            {/* Resume Upload Area */}
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
                    {fileName ? (
                      <>
                        <p className="text-lg font-medium text-foreground">{fileName}</p>
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
                    className="bg-white border-2 border-t-0 border-b-0 border-r-0 border-dashed border-muted-foreground/30 text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:border-purple-500 focus-visible:border-solid rounded-none h-12 px-4 py-8"
                  />
                </div>

                {/* JOB ROLE */}
                <div className="relative group w-1/2">
                  <Input
                    id="job-role"
                    type="text"
                    placeholder="Job Role"
                    className="bg-white border-2 border-t-0 border-b-0 border-dashed border-muted-foreground/30 text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:border-purple-500 focus-visible:border-solid rounded-none h-12 px-4 py-8"
                  />
                </div>
              </div>

              <Button className="w-full py-8 text-lg font-bold rounded-none rounded-b-xl bg-purple-700 text-white hover:bg-purple-800 transition-all shadow-none">
                Start Review
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FOOTER */}
        <footer className="w-full flex flex-row justify-between items-center p-6">
          <p className="text-zinc-500 text-sm font-medium">
            Made by <a href="https://www.sameerposwal.xyz" target="_blank" rel="noopener noreferrer" className="text-zinc-900 font-semibold hover:text-purple-700 hover:underline transition-colors">Sameer Poswal</a>
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/poswalsameer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-900 transition-colors transform hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sameerposwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#0077b5] transition-colors transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/samposwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-black transition-colors transform hover:scale-110"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
