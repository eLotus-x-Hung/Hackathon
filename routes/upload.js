const router = require('express').Router()
const multer  = require('multer')
const path = require('path')
const Img = require('../models/Image')
const authenticateUser = require('./verifyToken')
const { checkFileType } = require('../utils/utils')

const storage = multer.diskStorage({
    /**
     * @description handle filename with original extension
     * @param req
     * @param file
     * @param cb
     */
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})
/**
 * @description Configurations of multer, such as:
 * destination directory is tmp/
 * only allow upload image with extension is jpg, jpeg, png or gif
 * limit file size less than 8MB
 * @type {Multer}
 */
const upload = multer({
    storage,
    dest: 'tmp/',
    fileFilter: (_req, file, cb) => checkFileType(file, cb),
    limits: { fileSize: 8388608 } // 8MB
})

router.post('/', authenticateUser, upload.single('data'), async (req, res) => {
    const image = new Img({
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        destination: req.file.destination,
        createdBy: req.user._id,
    })
    await image.save()
    res.send("Save image successfully")
})

module.exports = router