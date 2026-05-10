const crypto = require("crypto");
const fs = require("fs");

const passwords = ["Character3D#@", "MyCharacter12", "MyCharacter123"];
const encryptedData = fs.readFileSync("public/models/character.enc");
const iv = encryptedData.slice(0, 16);
const data = encryptedData.slice(16);

passwords.forEach(password => {
  try {
    const key = crypto.createHash("sha256").update(password).digest();
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(data);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log(`Password "${password}" worked! Decrypted size: ${decrypted.length}`);
  } catch (err) {
    console.log(`Password "${password}" failed: ${err.message}`);
  }
});
