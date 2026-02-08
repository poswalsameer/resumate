"use client"

import Header from "@/components/upload-resume/header"
import Footer from "@/components/upload-resume/footer"
import UploadResume from "@/components/upload-resume/upload-resume-input"

export default function Home() {

  return (
    <div className="min-h-screen bg-[#FAFAF9] w-full flex flex-col items-center justify-center font-sans">
      <div className="h-full w-full flex flex-col gap-y-6 mx-auto max-w-7xl sm:max-w-5xl px-4 py-6 sm:p-8">
        <Header />
        <UploadResume />
        <Footer />
      </div>
    </div>
  )
}
