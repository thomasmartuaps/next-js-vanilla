/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

async function updateUser(
  email: string | any,
  password: string | any,
  id: number | any
) {
  const salt: any = process.env.NEXT_PUBLIC_SALT;
  let hashPass: string;
  bcrypt.hash(password, Number(salt), async (err, hash) => {
    hashPass = hash;
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: email,
        passwords: hashPass,
      },
    });
  });
}

const updateUserData = (req: NextApiRequest, res: NextApiResponse): void => {
  updateUser(req.body.email, req.body.password, req.body.id)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.status(200).json({
    message: 'update success',
  });
};

export default (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return res.status(400).json({ message: 'wrong method' });

    case 'POST':
      return res.status(400).json({ message: 'wrong method' });

    case 'PUT':
      return updateUserData(req, res);

    case 'DELETE':
      return res.status(400).json({ message: 'wrong method' });

    default:
      return res.status(400).json({ message: 'wrong method' });
  }
};
