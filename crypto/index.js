const crypto = require("crypto")

const generateKey = (secret) => crypto.createHash('sha256').update(secret).digest();
const generateIv = (initialVector) => crypto.createHash('sha256').update(initialVector).digest().slice(0, 16);

const encryption = (secret, initialVector, data) => {
    const key = generateKey(secret);
    const iv = generateIv(initialVector);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

const decryption = (secret, initialVector, data) => {
    const key = generateKey(secret);
    const iv = generateIv(initialVector);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

const hashing = (hashingType, data) => {
    const hash = crypto.createHash(hashingType);
    hash.update(data);
    return hash.digest('hex');
}

const encoding = (encodingType, data) => {
    const buffer = Buffer.from(data, 'utf-8');
    return buffer.toString(encodingType);
}

const decoding = (encodingType, data) => {
    const buffer = Buffer.from(data, encodingType);
    return buffer.toString('utf-8');
}

let secret = "somethingsecret";
let initialVector = "initialVector";
let data = "Hello, Aditya!";

let encryptedText = encryption(secret, initialVector, data)
console.log("encrypted text ->", encryptedText)
console.log("decrypted text ->", decryption(secret, initialVector, encryptedText));

let sha256Hash = hashing('sha256', data);
console.log("sha256 ->", sha256Hash)

let encodingText = encoding('base64', data);
let decodingText = decoding('base64', encodingText);
console.log("encoding ->", encodingText)
console.log("decoding ->", decodingText)