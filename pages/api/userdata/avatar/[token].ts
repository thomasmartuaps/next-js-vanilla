import { PrismaClient } from '@prisma/client';
import fs from 'fs-extra';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.query;
    const algorithms: any = 'HS256';
    let decoder: any;
    const prisma = new PrismaClient();
    const prKey = fs.readFileSync('configJWT/public.pem');
    await verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
      decoder = decoded;
    });
    if (decoder) {
      const user = await prisma.profile.findFirst({
        where: {
          userid: decoder.id,
        },
      });
      const streamImage = fs.createReadStream(
        `${process.cwd()}/${user?.avatar}`
      );
      const imageType: any = user?.avatartype;
      res.setHeader('Content-Type', imageType);
      streamImage.on('open', () => {
        streamImage.pipe(res);
      });
      streamImage.on('error', (err) => {
        res.end(err);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
