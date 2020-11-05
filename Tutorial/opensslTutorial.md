# Step cetak Public Key dan Private Key untuk token JWT
1. Install OpenSSL dan buka
2. setelah dibuka ketik dibawah ini untuk generate private key
    <pre>
    <code>
    openssl genrsa -out publicKey/jwt/private.pem -aes256 4096
    </code>
    </pre>
3. setelah itu ketik dibawah ini untuk cetak crt public key
    <pre>
    <code>
    openssl rsa -pubout -in publicKey/jwt/private.pem -out publicKey/jwt/public.pem
    </code>
    </pre>
