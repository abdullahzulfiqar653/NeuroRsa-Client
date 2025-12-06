// src/utils/cryptoOperations.js
import Words from '../data/Seeds'
import * as openpgp from 'openpgp';


// 1. Generate Secure Seed Phrase
export async function generateSeedPhrase() {
    const entropy = crypto.getRandomValues(new Uint8Array(16));
    const seedWords = [];
    for (let i = 0; i < 16; i++) {
        const randomIndex = entropy[i] % Words.length;
        seedWords.push(Words[randomIndex]);
    }
    return seedWords.join(' ');
}

// 2. Derive Seeds Hash
export async function deriveSeedsHash(seedPhrase) {
    const encoder = new TextEncoder();
    const data = encoder.encode(seedPhrase);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const loginHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return { loginHash };
}


// 3. Derive Encryption Key (using proper KDF)
export async function deriveEncryptionKey(seedPhrase, saltBase64 = null) {
    const encoder = new TextEncoder();
    const seedBuffer = encoder.encode(seedPhrase);
    const saltBuffer = saltBase64 ? base64ToArrayBuffer(saltBase64) : crypto.getRandomValues(new Uint8Array(16));

    // Import raw seed
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        seedBuffer,
        'PBKDF2',
        false,
        ['deriveKey']
    );

    // Derive AES-GCM key
    const encryptionKey = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    const exportedKey = await crypto.subtle.exportKey("raw", encryptionKey);
    const keyBase64 = arrayBufferToBase64(exportedKey);

    return {
        encryptionKey,
        encryptionBase64: keyBase64,
        salt: arrayBufferToBase64(saltBuffer)
    };
}


// 4. Generate PGP Key Pair (REAL PGP - Production Ready)
export async function generateKeyPair(seedPhrase) {
    const seedBuffer = new TextEncoder().encode(seedPhrase);
    const hashBuffer = await crypto.subtle.digest('SHA-256', seedBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const userId = `zk-user-${hashHex.substring(0, 16)}@seed-based.local`;
    const userName = `ZK User ${hashHex.substring(0, 8)}`;

    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa',
        rsaBits: 2048,
        userIDs: [{ name: 'Demo User' }]
    });

    return { privateKey, publicKey };
}

// 5. Encrypt Private Key (AES-GCM)
export async function encryptPrivateKey(privateKey, encryptionKey) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const privateKeyBuffer = new TextEncoder().encode(privateKey);

    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        encryptionKey,
        privateKeyBuffer
    );

    // Extract the tag (typically 16 bytes for AES-GCM)
    const tagLength = 16;
    const encryptedData = encrypted.slice(0, encrypted.byteLength - tagLength);
    const tag = encrypted.slice(encrypted.byteLength - tagLength);

    return {
        encryptedPrivateKey: arrayBufferToBase64(encryptedData),
        iv: arrayBufferToBase64(iv),
        tag: arrayBufferToBase64(tag)
    };
}


export async function decryptPrivateKey(encryptedData, iv, tag, encryptionKey) {
    const encryptedBuffer = base64ToArrayBuffer(encryptedData);
    const tagBuffer = base64ToArrayBuffer(tag);
    const combined = new Uint8Array(encryptedBuffer.byteLength + tagBuffer.byteLength);
    combined.set(new Uint8Array(encryptedBuffer), 0);
    combined.set(new Uint8Array(tagBuffer), encryptedBuffer.byteLength);

    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: base64ToArrayBuffer(iv)
        },
        encryptionKey,
        combined
    );

    return new TextDecoder().decode(decrypted);
}


export async function encryptUserData(userData, publicKeyArmored) {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: userData }),
        encryptionKeys: publicKey
    });

    return encrypted;
}

// 7. Complete Production Signup Flow
export async function storeEncryptionKey(key) {
    try {
        localStorage.setItem('encryption-key', key);
        return { success: true };
    } catch (error) {
        console.error('Seed storage error:', error);
        throw new Error('Failed to store seed phrase');
    }
}

export async function importAesKeyFromBase64(base64Key) {
    const rawKey = base64ToArrayBuffer(base64Key);

    return crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
}


export async function getStoredEncryptionKey() {
    try {
        const base64Key = localStorage.getItem('encryption-key');
        if (!base64Key) {
            throw new Error('No encryption key found in storage');
        }

        // Convert Base64 → CryptoKey
        const cryptoKey = await importAesKeyFromBase64(base64Key);
        return cryptoKey;

    } catch (error) {
        throw new Error('Failed to load encryption key');
    }
}


export async function performSignup(seedPhrase) {
    try {
        const { loginHash } = await deriveSeedsHash(seedPhrase);
        const { encryptionKey, encryptionBase64, salt } = await deriveEncryptionKey(seedPhrase);
        const { privateKey, publicKey } = await generateKeyPair(seedPhrase);
        const encryptedPrivate = await encryptPrivateKey(privateKey, encryptionKey);
        await storeEncryptionKey(encryptionBase64);

        return {
            loginHash,
            publicKey,
            encryptedPrivateKey: encryptedPrivate.encryptedPrivateKey,
            encryptedPrivateKeyIV: encryptedPrivate.iv,
            encryptedPrivateKeyTag: encryptedPrivate.tag,
            encSalt: salt,
            createdAt: new Date().toISOString(),
        };

    } catch (error) {
        console.error('Production signup error:', error);
        throw new Error(`Signup failed: ${error.message}`);
    }
}



// 9. Login Flow 
export async function handleSuccessfulLogin(loginResponse, seedPhrase) {
    try {
        const { access, cryptographic_data } = loginResponse;

        localStorage.setItem('access_token', access);

        const userCryptoData = {
            publicKey: cryptographic_data.public_key,
            encryptedPrivateKey: cryptographic_data.encrypted_private_key,
            encryptedPrivateKeyIV: cryptographic_data.encrypted_private_key_iv,
            encryptedPrivateKeyTag: cryptographic_data.encrypted_private_key_tag,
            encSalt: cryptographic_data.enc_salt,
        };

        localStorage.setItem('crypto_data', JSON.stringify(userCryptoData));

        const { encryptionBase64 } = await deriveEncryptionKey(seedPhrase, cryptographic_data.enc_salt);
        await storeEncryptionKey(encryptionBase64);

        try {
            return {
                success: true,
                userCryptoData,
            };
        } catch (decryptError) {
            console.warn('Could not decrypt private key now, but login successful');
            return {
                success: true,
                userCryptoData,
            };
        }

    } catch (error) {
        console.error('Error handling login:', error);
        throw new Error(`Login processing failed: ${error.message}`);
    }
}

export function logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('crypto_data');
    localStorage.removeItem('encryption-key');
}

// 10. Utility Functions
function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64) {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}


export async function encryptAnyData(data) {
    try {

        const cryptoData = localStorage.getItem("crypto_data");
        if (!cryptoData) {
            throw new Error("No cryptographic data found. Please login first.");
        }

        const parsedCryptoData = JSON.parse(cryptoData);
        publicKeyToUse = parsedCryptoData.publicKey;

        if (!data) {
            throw new Error("No data provided for encryption.");
        }

        let dataString;
        if (typeof data === 'string') {
            dataString = data;
        } else if (typeof data === 'object') {
            dataString = JSON.stringify(data);
        } else {
            dataString = String(data);
        }

        const publicKey = await openpgp.readKey({ armoredKey: publicKeyToUse });
        const message = await openpgp.createMessage({ text: dataString });
        const encrypted = await openpgp.encrypt({
            message: message,
            encryptionKeys: publicKey,
            config: {
                preferredCompressionAlgorithm: openpgp.enums.compression.zlib
            }
        });

        return encrypted;

    } catch (error) {
        throw new Error(`Encryption failed: ${error.message}`);
    }
}

export async function decryptAnyData(encryptedDataArmored) {
    try {
        if (!encryptedDataArmored) {
            throw new Error("No encrypted data provided.");
        }

        const cryptoData = localStorage.getItem("crypto_data");
        if (!cryptoData) {
            throw new Error("No cryptographic data found. Please login first.");
        }

        const parsedCryptoData = JSON.parse(cryptoData);
        const encryptionKey = await getStoredEncryptionKey();

        // Decrypt the private key
        const privateKey = await decryptPrivateKey(
            parsedCryptoData.encryptedPrivateKey,
            parsedCryptoData.encryptedPrivateKeyIV,
            parsedCryptoData.encryptedPrivateKeyTag,
            encryptionKey
        );

        const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: privateKey });
        const message = await openpgp.readMessage({
            armoredMessage: encryptedDataArmored
        });
        const { data: decryptedString } = await openpgp.decrypt({
            message,
            decryptionKeys: privateKeyObj
        });

        try {
            return JSON.parse(decryptedString);
        } catch {
            return decryptedString;
        }

    } catch (error) {
        throw new Error(`Decryption failed: ${error.message}`);
    }
}

export default {
    generateSeedPhrase,
    performSignup,
    deriveSeedsHash,
};