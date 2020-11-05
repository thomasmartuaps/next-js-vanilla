import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
let Users: unknown;
async function getdata() {
  Users = await prisma.user.findMany();
}

const getuser = (req: NextApiRequest, res: NextApiResponse): any => {
  return getdata()
    .catch((e) => {
      res.status(400).json({
        error: e,
      });
    })
    .finally(async () => {
      await prisma.$disconnect();
      res.status(200).json({
        data: Users,
      });
    });
};

export default (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return getuser(req, res);

    case 'POST':
      return res.status(400).json({ message: 'wrong method' });

    case 'PUT':
      return res.status(400).json({ message: 'wrong method' });

    case 'DELETE':
      return res.status(400).json({ message: 'wrong method' });

    default:
      return res.status(400).json({ message: 'wrong method' });
  }
};
