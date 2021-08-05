let fs = require('fs');
let crypt = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'secret';
let stream = fs.createReadStream('./encFiles/IMG_0843');

let decrypt = crypt.createDecipher(algorithm, password);
let toArray = require('stream-to-array');

stream = stream.pipe(decrypt);
let data;
toArray(stream, function(err, arr){
    data = Buffer.concat(arr);
    data = Buffer.from(data).toString('base64');
    console.log('data: ', data);
})