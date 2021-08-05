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
var fileType = '.' + 'jpg'; //file extension
var files = [];
fs.readdir(dirPath, function (err, list) {
    if (err) throw err;
    for (var i = 0; i < list.length; i++) {
        if (path.extname(list[i]) === fileType) {
            r = fs.createReadStream('Files/' + list[i]);
            w = fs.createWriteStream('encFiles/' + list[i].replace('.jpg', ''));
            console.log(list[i]); //print the file
            // start pipe
            r.pipe(encrypt).pipe(w);
        }
    }
});