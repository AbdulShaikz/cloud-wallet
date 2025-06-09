import CryptoJS from 'crypto-js';

export function encryptSecretKey(secretKey: string, password: string): string {
  return CryptoJS.AES.encrypt(secretKey, password).toString()
}

export function decryptSecretKey(encrypted: string, password: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, password)
  return bytes.toString(CryptoJS.enc.Utf8)
}
