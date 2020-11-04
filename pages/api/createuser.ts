import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// eslint-disable-next-line
async function addUser(email: string | any, password: string | any) {
  // eslint-disable-next-line
  const createUser = await prisma.user.create({
    data: {
      username: email,
      passwords: password,
    },
  });
}

const addUserData = (req: NextApiRequest, res: NextApiResponse): void => {
  addUser(req.body.email, req.body.password)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.status(200).json({
    message: 'create success',
  });
};

export default addUserData;
