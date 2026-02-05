import { Request, Response } from 'express'
import { OpenRouter } from '@openrouter/sdk'
import { generateResumeSystemPrompt } from '../utils/system-prompt.js'

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function reviewResumeController(req: Request, res: Response) {
  try {
    const { resumeText, jobDescription } = req.body

    console.log(process.env.OPENROUTER_API_KEY)

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Resume text and job description are required',
      })
    }

    const systemPrompt = generateResumeSystemPrompt(resumeText)

    const stream = await openrouter.chat.send({
      model: 'z-ai/glm-4.5-air:free',
      messages: [
        {
          role: 'user',
          content: systemPrompt,
        },
      ],
      stream: true,
    })

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })

    if (stream instanceof ReadableStream) {
      const reader = stream.getReader()

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = value
          const delta = chunk.choices?.[0]?.delta

          if (delta?.reasoning) {
            res.write(`event: reasoning\n`)
            res.write(`data: ${JSON.stringify({ text: delta.reasoning })}\n\n`)
          }

          if (delta?.content) {
            res.write(`event: content\n`)
            res.write(`data: ${JSON.stringify({ text: delta.content })}\n\n`)
          }
        }
      } catch (err) {
        console.error('Stream error:', err)
      } finally {
        res.end()
      }
    } else {
      // Fallback if stream is not a standard ReadableStream
      console.log('Stream is not a ReadableStream:', stream)
      res.end()
    }
  } catch (error) {
    console.error(
      `Error while generating resume review :${JSON.stringify(error, null, 2)}`,
    )
    return (
      res
        .status(500)
        //@ts-expect-error -- Ignore type error
        .json({ success: false, message: error.message })
    )
  }
}
