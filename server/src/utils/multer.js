import multer from 'multer'
import path from 'path'
import { __dirname } from './../../utils.js';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'src','assets'))},
    filename: function(req, file, cb){
        cb(null, file.originalname) // Nombre del archivo
    }
})
const uploader = multer({ storage })

export default uploader
