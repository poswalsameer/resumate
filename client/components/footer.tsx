import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full flex flex-row justify-between items-center p-6">
      <p className="text-zinc-500 text-sm font-medium">
        Made by <a href="https://www.sameerposwal.xyz" target="_blank" rel="noopener noreferrer" className="text-purple-800 font-medium hover:underline transition-colors">Sameer Poswal</a>
      </p>
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/poswalsameer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-800"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/sameerposwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-800"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com/samposwal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-800"
          aria-label="X (Twitter)"
        >
          <Twitter className="w-5 h-5" />
        </a>
      </div>
    </footer>
  )
}