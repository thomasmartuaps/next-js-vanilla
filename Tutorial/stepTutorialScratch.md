# Tutorial jika ingin memakai prisma dengan next.js
1. Dari boilerplate Next.js NUTT git clone<br/>
2. <code>yarn install</code>(hapus ' di package.json kalau windows)<br/>
3. Install prisma dengan<br/>
    <code>yarn add @prisma/client<br/>
    -yarn add @prisma/cli -D<br/></code>
4. Init prisma gunakan <code>yarn prisma init</code> yang menghasilkan folder prisma isinya .env dan schema.prisma<br/>
5. Di dalam file <code>prisma/.env</code> rubah kode dibawah ini sesuai yang ditandai (user menjadi username,dsb), default schema itu public)<br/>
<pre><code> postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public</code></pre>
 
6. Buat file schema.sql dan buat semua table di file tersebut menggunakan sql postgres dengan contoh:
<pre><code>CREATE TABLE "public"."User" (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    passwords VARCHAR(255) NOT NULL
);
</code></pre><br/>
7. Buka psql shell(dari windows search psql)<br/>
# WINDOWS:<br/>
8. Tekan Enter di psql shell nya sampai password masukin password<br/>
9. Setelah memasukan password ketik:
<pre><code>\connect DATABASE(DATABASE itu nama database nya di postgres, Dibuat manual)</code></pre> <br/>
10. Setelah connect ke database sambungkan dengan schema.sql yang sudah dibuat di nomor 6 dengan command:
<pre><code>"\i 'c:/hello-prisma/schema.sql'"(ganti hello-prisma/schema.sql nya itu dengan directory dimana file schema.sql ada di project anda.)</code></pre> <br/>
11. Setelah table sudah dibuat/generate(bisa di check di pgAdmin4) ketik kode dibawah untuk introspect data dan generate table di schema.prisma<br/>
<pre><code> npx prisma introspect</code></pre> 
# MAC:<br/>
9-11: untuk mac ketik:
<pre><code> psql -h HOST -d DATABASE -U USER -f schema.sql ganti HOST DATABASE USER dengan yang kedaftar di postgres kemudian npx prisma introspect</code></pre><br/>
12. ketik <code>npx prisma generate</code> untuk generate node modules prisma client<br/>
13. buat file ts di pages/api(contohnya pages/api/hello.ts)<br/>
14. buat route sesuai tutorial next (misalnya di file api buat <code>getuser.ts</code>) <br/>
15. isi routenya dengan contoh sperti ini(tidak fix bisa dibentuk sesuai keinginan diluar prisma dan async function main).<br/>
## Contoh Code:
<pre><code>
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
let Users: unknown;
async function main() {
  Users = await prisma.user.findMany();
}

const getuser = (req: NextApiRequest, res: NextApiResponse): void => {
    main()
      .catch((e) => {
        res.status(400).json({
          error: e,
        });
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.status(200).json({
      data: Users,
    });
};

export default getuser;
</code></pre>
16. Setelah bisa maka anda bisa akses API nya dengan cara di tutorial next.js misalnya <code>http://localhost:3000/api/getuser</code>