
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ThinkingProcessProps {
  thinkingText: string
  isThinkingDone: boolean
}

export default function ThinkingProcess({ thinkingText, isThinkingDone }: ThinkingProcessProps) {
  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardContent className="flex flex-col gap-0 p-0 bg-transparent">
        <div className="flex flex-col bg-transparent items-center justify-center w-full py-4 border-2 border-muted-foreground/30 rounded-t-xl">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-foreground">
              {isThinkingDone ? "Finalizing Report" : "Analyzing Resume"}
            </h3>
            {!isThinkingDone && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />}
          </div>
        </div>

        <div className="w-full border-2 border-t-0 border-muted-foreground/30 rounded-b-xl">
          <div className="p-6 h-[300px] overflow-y-auto font-mono font-normal text-sm bg-transparent text-black">
            {thinkingText ? (
              <div className="space-y-1">
                <span className="whitespace-pre-wrap leading-relaxed">{thinkingText}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-zinc-800">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Waiting for thoughts stream...</span>
              </div>
            )}
          </div>
        </div>

      </CardContent>
    </Card >
  )
}
