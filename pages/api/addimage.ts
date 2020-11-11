/* eslint-disable @typescript-eslint/no-explicit-any */
import middlewares from '@middlewares/index';
import { PrismaClient } from '@prisma/client';
import imgtype from '@utils/filetype';
import * as fs from 'fs-extra';
import moment from 'moment';
import nextConnect from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(middlewares);
const prisma = new PrismaClient();

async function insertProfile(
  handphone: string | any,
  alamat: string | any,
  avatar: string | any,
  userId: string
) {
  let date: any = new Date();
  date = date.toDateString();
  date = date.split(' ');
  // fs.existsSync
  return 'hahaha';
}

handler.post(async (req: any, res: any) => {
  let path: string;
  const { files } = req;
  const { body } = req;
  console.log(files);
  console.log(body);
  try {
    // do stuff with files and body
    const imageType = imgtype(files.avatar.type);
    const rawData = fs.readFileSync(files.avatar.path);
    path = `uploads/avatar/${moment(new Date()).format('YYYY/MM')}`;
    fs.mkdirpSync(path);
    await fs.writeFile(
      `${path}/avatar_${body.userId}.${imageType}`,
      rawData,
      (err) => {
        if (!err) {
          res.status(200).json({
            body,
            files,
          });
        }
      }
    );

    // cetak gambar ke folder uploads sama masukin ke db profile
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

handler.get(async (req: any, res: any) => {
  return res.status(400).json({
    message: 'wrong method',
  });
});
handler.put(async (req: any, res: any) => {
  return res.status(400).json({
    message: 'wrong method',
  });
});
handler.delete(async (req: any, res: any) => {
  return res.status(400).json({
    message: 'wrong method',
  });
});
// async function profile(req: NextApiRequest, res: NextApiResponse) {
// const data = upload.fields([{name: 'avatar', maxCount: 1}])
// upload.single('avatar')
// eslint-disable-next-line
// console.log(req.body.alamat);
// eslint-disable-next-line
// console.log(typeof req.body);
// insertProfile(req.body, req.body.alamat, req.body.avatar, req.body.userId);
//   const form = new formidable.IncomingForm();
//   form.uploadDir = './';
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     console.log(err, fields, files);
//   });
//   return res.status(200).json({
//     message: 'complete',
//   });
// }

// export default function addprofile(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): any {
//   switch (req.method) {
//     case 'GET':
//       return res.status(400).json({ message: 'wrong method' });

//     case 'POST':
//       return uploadProfile(req, res);

//     case 'PUT':
//       return res.status(400).json({ message: 'wrong method' });

//     case 'DELETE':
//       return res.status(400).json({ message: 'wrong method' });

//     default:
//       return res.status(400).json({ message: 'wrong method' });
//   }
// }
export default handler;
