import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line
async function deleteUser(id: number | any) {
  // eslint-disable-next-line
  const createUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
}

const deleteUserData = (req: NextApiRequest, res: NextApiResponse): void => {
  deleteUser(req.body.id)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
      return res.status(200).json({
        message: 'delete success',
      });
    });
};

export default (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return res.status(400).json({ message: 'wrong method' });

    case 'POST':
      return res.status(400).json({ message: 'wrong method' });

    case 'PUT':
      return res.status(400).json({ message: 'wrong method' });

    case 'DELETE':
      return deleteUserData(req, res);

    default:
      return res.status(400).json({ message: 'wrong method' });
  }
};
