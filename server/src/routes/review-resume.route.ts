import { Router } from 'express'
import { reviewResumeController } from '../controllers/review-resume.controller.js'

const router = Router()

router.post('/', (req, res) => reviewResumeController(req, res))

export default router
