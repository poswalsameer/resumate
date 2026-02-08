"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import UploadResume from "@/components/upload-resume"

export default function Home() {

  return (
    <div className="min-h-screen bg-[#FAFAF9] w-full flex flex-col items-center justify-center font-sans">
      <div className="h-full w-full flex flex-col gap-y-6 mx-auto max-w-5xl p-8">
        <Header />
        <UploadResume />
        <Footer />
      </div>
    </div>
  )
}
