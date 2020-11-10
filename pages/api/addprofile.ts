/* eslint-disable @typescript-eslint/no-explicit-any */
import middlewares from '@middlewares/index';
import { PrismaClient } from '@prisma/client';
import imgtype from '@utilities/filetype';
import * as fs from 'fs-extra';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { NextConnect } from 'next-connect';
import * as path from 'path';

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
  try {
    const { files } = req;
    const { body } = req;
    // do stuff with files and body
    // console.log(files);
    // console.log(body);
    const imageType = imgtype(files.avatar.type);
    const rawData = fs.readFileSync(files.avatar.path);
    await fs.writeFile(`uploads/avatar/gisel.${imageType}`, rawData, (err) => {
      if (!err) {
        console.log('uploaded');
      }

      res.status(200).json({
        body,
        files,
      });
    });
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
