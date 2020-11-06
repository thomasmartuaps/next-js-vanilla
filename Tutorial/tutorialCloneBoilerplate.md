# Step menjalankan server dari git clone
### 1. Setelah clone ketik : <br/> <pre><code> yarn install</code></pre>
### 2. Buat schema tabel di prisma/Model/schema.sql<br/>
### 3. Buka psqlshell(ikuti cara [stepTutorialScratch](./stepTutorialScratch.md) di nomor 7) untuk membuat database PG.<br/>
### 4. Setelah selesai membuat database nya ketik code dibawah ini untuk mencetak dari database ditaruh dalam prisma/schema.prisma<br/>
 <pre><code>npx prisma introspect</code></pre><br/>
### 5. Ganti file env dalam folder prisma menjadi .env dan bagian ini tolong dirubah sesuai settingan postgresql nya
<pre><code>DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"</code></pre><br/>
### 6. Setelah itu ketik code dibawah ini untuk generate dan bisa dijalankan<br/>
<pre><code>npx prism generate</code></pre><br/>
### 7 Setelah muncul reply yang seperti dibawah ini di terminal: <br/>
<pre><code>
✔ Generated Prisma Client (version: 2.10.2) to .\node_modules\@prisma\client in 54ms

You can now start using Prisma Client in your code:

```
import { PrismaClient } from '@prisma/client'
// or const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
```
</code></pre> 
## Selamat, Anda berhasil setup app ini dan dapat dijalankan dengan:<br/>
<pre><code>yarn dev</code></pre>

### P.s

- <code>nextconfigjs</code> dirubah jadi next.config.js untuk ENV nya dan untuk env next harus diawali dengan <code>NEXT_PUBLIC_</code>