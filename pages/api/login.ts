/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
let Users: any;
let token: string;

async function DBcheckUser(email: string) {
  Users = await prisma.user.findFirst({
    where: {
      username: email,
    },
  });
}

const post = (req: NextApiRequest, res: NextApiResponse): any => {
  return DBcheckUser(req.body.email)
    .then(() => {
      return bcrypt.compare(
        req.body.password,
        Users.passwords,
        (err, result) => {
          if (result) {
            const prKey = fs.readFileSync('configJWT/public.pem');
            token = sign(
              {
                username: Users.username,
                id: Users.id,
              },
              prKey
            );
            return res.status(200).json({
              message: 'login success',
              token,
            });
          }
          return res.status(400).json({
            message: 'login failed',
          });
        }
      );
    })
    .catch((e) => {
      return res.status(400).json({
        message: 'wrong email password',
      });
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export default (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return res.status(400).json({ message: 'wrong method' });

    case 'POST':
      return post(req, res);

    case 'PUT':
      return res.status(400).json({ message: 'wrong method' });

    case 'DELETE':
      return res.status(400).json({ message: 'wrong method' });

    default:
      return res.status(400).json({ message: 'wrong method' });
  }
};
