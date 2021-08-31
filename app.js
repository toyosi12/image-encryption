const express = require('express');
const app = express();
const path = require('path');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
const multer = require('multer');
const { nextTick } = require('process');
let fileName;
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Files')
    },
    filename: function(req, file, cb){
        fileName = file.originalname;
        cb(null,  fileName)
    }
})

let upload = multer({storage});

app.use(express.static(path.join(__dirname, './')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './', 'index.html'));
})


app.post('/encrypt', upload.single('to_be_encrypted'), (req, res, ext) => {
    const file = req.file;
    if(!file){
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    encrypt.encrypt(file.filename);
    res.send(file);
});

app.post('/decrypt', upload.single('to_be_decrypted'), async (req, res, ext) => {
    const file = req.file;
    if(!file){
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    let decryptedImage = await decrypt.decrypt(file.filename);
    res.send(decryptedImage);

    
})

app.listen(5000, function(){
    console.log('listening on port 5000')
})