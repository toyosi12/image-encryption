const decrypt = async (fileName) => {
    let fs = require('fs');
    let crypt = require('crypto'),
            algorithm = 'aes-256-ctr',
            password = 'secret';
    let stream = fs.createReadStream('encFiles/' + fileName);
    
    let decrypt = crypt.createDecipher(algorithm, password);
    let toArray = require('stream-to-array');   
    
    stream = stream.pipe(decrypt);
    const buffer = Buffer.concat(await toArray(stream));
    const data = Buffer.from(buffer).toString('base64');
    return {success: true, data: data};

}

module.exports.decrypt = decrypt;