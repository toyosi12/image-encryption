const encrypt = async (fileName) => {
    let crypto;
    try {
        crypto = require('crypto');
    } catch (err) {
        console.log('crypto support is disabled!');
    }
    var algorithm = 'aes-256-ctr',
            password = 'secret';
    var fs = require('fs');
    var r;
    
    // encrypt content
    var encrypt = crypto.createCipher(algorithm, password);
    // decrypt content
    var decrypt = crypto.createDecipher(algorithm, password);
    
    // write file
    var w;
    var path = require('path');
    var dirPath = './Files/';  //directory path
    var fileTypes = ['.jpg', '.jpeg', '.png'];
    if (fileTypes.includes(path.extname(fileName).toLowerCase())) {
        r = fs.createReadStream('Files/' + fileName);
        w = fs.createWriteStream('encFiles/' + fileName.replace(/.jpg|.png|.jpeg/gi, '.enc'));

        // start pipe
        r.pipe(encrypt).pipe(w);
    }

}

exports.encrypt = encrypt;