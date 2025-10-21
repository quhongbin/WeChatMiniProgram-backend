import { Router as _Router } from 'express'
const router = _Router()
import {getAllPosts,deletePost,getPostsCounts}  from '../controllers/postController.js'



router.get('/all',getAllPosts)
router.delete('/:id',deletePost)
router.get('/count',getPostsCounts)

export default router