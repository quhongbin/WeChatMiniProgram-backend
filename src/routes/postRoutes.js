import { Router as _Router } from 'express'
const router = _Router()
import {getAllPosts}  from '../controllers/postController.js'



router.get('/all',getAllPosts)

export default router