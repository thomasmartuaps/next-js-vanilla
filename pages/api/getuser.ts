import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
let Users: unknown;
async function getdata() {
  Users = await prisma.user.findMany();
}

const getuser = (req: NextApiRequest, res: NextApiResponse): void => {
  getdata()
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
