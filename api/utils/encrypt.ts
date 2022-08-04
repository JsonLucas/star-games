import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

const key = randomBytes(32);
const iv = randomBytes(16);
const cipher = createCipheriv('aes-256-gcm', key, iv);
const decipher = createDecipheriv('aes-256-gcm', key, iv);

export const encrypt = (content: string) => {
    return `${cipher.update(content, 'utf8', 'hex')}${cipher.final('hex')}`;
}

export const decrypt = (content: string) => {
    return `${decipher.update(content, 'hex', 'utf-8')}${decipher.final('utf8')}`;
}