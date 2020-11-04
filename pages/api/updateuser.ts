import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line
async function updateUser(
  // eslint-disable-next-line
  email: string | any,
  // eslint-disable-next-line
  password: string | any,
  // eslint-disable-next-line
  id: number | any
) {
  // eslint-disable-next-line
  await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      username: email,
      passwords: password,
    },
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

export default updateUserData;
