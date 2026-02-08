import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import reviewResumeRouter from './routes/review-resume.route.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://resumate.sameerposwal.xyz'],
    credentials: true,
  }),
)
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/v1/review-resume', reviewResumeRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
