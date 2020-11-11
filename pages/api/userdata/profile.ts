/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import middlewares from '@middlewares/index';
import { PrismaClient } from '@prisma/client';
import imgtype from '@utils/filetype';
import * as fs from 'fs-extra';
import { verify } from 'jsonwebtoken';
import moment from 'moment';
import nextConnect, { NextConnect } from 'next-connect';
import paths from 'path';
import process from 'process';

// const appDir = path.dirname(require.main.filename);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();
handler.use(middlewares);
const prisma = new PrismaClient();

// GET method (get data pribadi sesuai token yang dikirim)
handler.get(async (req: any, res: any) => {
  const { token } = req.headers;
  const algorithms: any = 'HS256';
  let userId: number;
  let data: any;
  const prKey = fs.readFileSync('configJWT/public.pem');
  await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
    console.log('verified');
    userId = decoded.id;
    prisma.profile
      .findFirst({
        where: {
          userid: userId,
        },
      })
      .then((result) => {
        data = result;
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        prisma.$disconnect();
        return res.status(200).json({
          message: 'get Profile Success',
          data,
        });
      });
  });
});
// POST method
handler.post(async (req: any, res: any) => {
  try {
    // do stuff with files and body
    const { token } = req.headers;
    const { files } = req;
    const { body } = req;
    const rawData = fs.readFileSync(files.avatar.path);
    const path = `uploads/avatar/${moment(new Date()).format('YYYY/MM')}`;
    const imageType = imgtype(files.avatar.type);
    const imagePath = `${path}/avatar_${body.userId}.${imageType}`;
    const prKey = fs.readFileSync('configJWT/public.pem');
    const algorithms: any = 'HS256';
    let userId;
    await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
      console.log('verified');
      userId = decoded.id;
    });
    const existData = await prisma.profile.findFirst({
      where: {
        userid: userId,
      },
    });
    if (!existData) {
      fs.mkdirpSync(path);
      await fs.writeFile(imagePath, rawData, (err) => {
        if (!err) {
          console.log('uploaded');
        }
      });
      prisma.profile
        .create({
          data: {
            alamat: body.alamat,
            handphone: body.handphone,
            avatar: imagePath,
            avatartype: files.avatar.type,
            userid: Number(userId),
          },
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          prisma.$disconnect();
        });
    } else {
      return res.status(400).json({
        message: 'DATA ALREADY EXIST',
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
  return res.status(200).json({
    message: 'add profile success!!',
  });
});
// PUT method
handler.put(async (req: any, res: any) => {
  const { token } = req.headers;
  const { files } = req;
  const { body } = req;
  const rawData = fs.readFileSync(files.avatar.path);
  const path = `uploads/avatar/${moment(new Date()).format('YYYY/MM')}`;
  const imageType = imgtype(files.avatar.type);
  const imagePath = `${path}/avatar_${body.userId}.${imageType}`;
  const prKey = fs.readFileSync('configJWT/public.pem');
  const algorithms: any = 'HS256';
  let userId;
  await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
    userId = decoded.id;
  });
  fs.mkdirpSync(path);
  const existData = await prisma.profile.findFirst({
    where: {
      userid: userId,
    },
  });
  console.log(existData);
  if (existData) {
    await prisma.profile
      .findFirst({
        where: {
          userid: userId,
        },
      })
      .then(async (result) => {
        const delPath: any = paths.resolve(
          `${process.cwd()}/${result?.avatar}`
        );
        console.log(delPath);
        await fs.remove(delPath);
      })
      .finally(() => {
        prisma.$disconnect();
      });
    await prisma.profile
      .update({
        data: {
          alamat: body.alamat,
          handphone: body.handphone,
          avatar: imagePath,
          avatartype: files.avatar.type,
          userid: Number(userId),
        },
        where: {
          id: existData.id,
        },
      })
      .then(() => {
        fs.writeFile(imagePath, rawData, (err) => {
          if (!err) {
            console.log('uploaded');
          }
        });
      })
      .finally(() => {
        prisma.$disconnect();
      });

    return res.status(200).json({
      message: 'update profile success',
    });
  }
  return res.status(400).json({
    message: 'Data is not Exist',
  });
});
// DELETE method
handler.delete(async (req: any, res: any) => {
  try {
    const { token } = req.headers;
    const algorithms: any = 'HS256';
    let userId: number;
    let data: any;
    const prKey = fs.readFileSync('configJWT/public.pem');
    await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
      data = decoded;
    });
    const userExist = await prisma.profile.findFirst({
      where: {
        userid: data.id,
      },
    });
    if (userExist) {
      prisma.profile
        .delete({
          where: {
            id: userExist.id,
          },
        })
        .then((result) => {
          const delPath: any = paths.resolve(
            `${process.cwd()}/${userExist?.avatar}`
          );
          fs.remove(delPath);
          return res.status(200).json({
            message: 'delete success',
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: 'delete failed',
            errMessage: err,
          });
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'delete failed',
    });
  }
  return res.status(200).json({
    message: 'delete success',
  });
});

export default handler;
