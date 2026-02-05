import 'dotenv/config'
import express, { Request, Response } from 'express'
import reviewResumeRouter from './routes/review-resume.route.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/v1/review-resume', reviewResumeRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
