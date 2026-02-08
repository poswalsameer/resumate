import { Request, Response } from 'express'
import OpenAI from 'openai'
import { extractTextFromPdf } from '../utils/extract-text.js'
import { generateResumeSystemPrompt } from '../utils/system-prompt.js'

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

export async function reviewResumeController(req: Request, res: Response) {
  try {
    const { jobDescription, jobRole } = req.body
    let resumeText = req.body.resumeText

    // Check if file is uploaded
    if (req.file) {
      resumeText = await extractTextFromPdf(req.file.buffer)
    }

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: 'Resume file or text is required',
      })
    }

    const systemPrompt = generateResumeSystemPrompt(
      resumeText,
      jobDescription,
      jobRole,
    )

    const stream = await openai.chat.completions.create({
      model: 'moonshotai/kimi-k2-thinking',
      messages: [
        {
          role: 'user',
          content: systemPrompt,
        },
      ],
      temperature: 0,
      top_p: 0.7,
      stream: true,
    })

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta
      const content = delta?.content || ''
      // @ts-expect-error -- Ignore type error
      const reasoning = delta?.reasoning_content || ''

      if (reasoning) {
        res.write(`event: reasoning\n`)
        res.write(`data: ${JSON.stringify({ text: reasoning })}\n\n`)
      }

      if (content) {
        res.write(`event: content\n`)
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`)
      }
    }

    res.end()
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
