import { Router as _Router } from 'express'
import multer from 'multer'
import os from 'os'
import fs from 'fs'
import {WINDOWS,LINUX} from '../config/save_file.js'

import {getAllPosts,deletePost,getPostsCounts,createPost}  from '../controllers/postController.js'

const router = _Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (os.type()=== 'Windows_NT') {
        if (!fs.existsSync('uploads/')){
            fs.mkdirSync('uploads/');
        }
        cb(null, 'uploads/')
    }else if (os.type() === 'Linux') {
        if (!fs.existsSync(LINUX.dir)){
            fs.mkdirSync(LINUX.dir);
        }
        cb(null, LINUX.dir)
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '_' + new Date().toISOString()
    .replace(/\..*/g, '')
    .replace('T', '_')
    .replace(':', '-'))
  }
})
const upload = multer({ storage: storage })

router.get('/all',getAllPosts)
router.delete('/:id',deletePost)
router.get('/count',getPostsCounts)
router.post('/create',upload.single('file'),createPost)
export default router