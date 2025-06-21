import CryptoJs from "crypto-js";
const encrypt = (data: any, key: any) => {
  const cipherText = CryptoJs.AES.encrypt(JSON.stringify(data), key)
    .toString
    // CryptoJs.enc.Utf8
    ();
  // console.log("cipherText string:", cipherText);
  // const encryptedString = CryptoJs.enc.Utf8.parse(cipherText);
  console.log("encryted string:", cipherText);
  return cipherText
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove ending '=';
};

const decrypt = (ciphertext: string, key: any) => {
  console.log("cypher text:", ciphertext);
  ciphertext += Array(5 - (ciphertext.length % 4)).join("=");
  ciphertext = ciphertext
    .replace(/\-/g, "+") // Convert '-' to '+'
    .replace(/\_/g, "/"); // Convert '_' to '/'
  var bytes = CryptoJs.AES.decrypt(ciphertext.toString(), key);
  var decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
  console.log("decryptedData string:", decryptedData);
  return decryptedData;
};

export { encrypt, decrypt };
