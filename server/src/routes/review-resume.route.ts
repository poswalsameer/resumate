import { Router } from 'express'
import multer from 'multer'
import { reviewResumeController } from '../controllers/review-resume.controller.js'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post('/', upload.single('resume'), (req, res) =>
  reviewResumeController(req, res),
)

export default router
