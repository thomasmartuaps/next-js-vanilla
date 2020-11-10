/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
// Add User
async function addUser(username: string | any, password: string | any) {
  const salt: any = process.env.NEXT_PUBLIC_SALT;
  let hashPass: string;
  bcrypt.hash(password, Number(salt), async (err, hash) => {
    hashPass = hash;
    const createUser = await prisma.user.create({
      data: {
        username,
        passwords: hashPass,
      },
    });
  });
}
async function checkUser(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user;
}

const addUserData = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await checkUser(req.body.username);
  if (result) {
    return res.status(400).json({
      message: 'user already exist',
    });
  }

  addUser(req.body.username, req.body.password)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return res.status(200).json({
    message: 'create success',
  });
};
// Add User Done.
// Get User
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
// Get User Done
// Update User
async function updateUser(
  username: string | any,
  password: string | any,
  id: number | any
) {
  const salt: any = process.env.NEXT_PUBLIC_SALT;
  let hashPass: string;
  // eslint-disable-next-line
  console.log(username, password, id);
  bcrypt.hash(password, Number(salt), async (err, hash) => {
    hashPass = hash;
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username,
        passwords: hashPass,
      },
    });
  });
}

const updateUserData = (req: NextApiRequest, res: NextApiResponse): void => {
  updateUser(req.body.username, req.body.password, req.body.id)
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
// Update User Done
// Delete User
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
// Delete User Done

export default (req: NextApiRequest, res: NextApiResponse): any => {
  switch (req.method) {
    case 'GET':
      return getuser(req, res);

    case 'POST':
      return addUserData(req, res);

    case 'PUT':
      return updateUserData(req, res);

    case 'DELETE':
      return deleteUserData(req, res);

    default:
      return res.status(400).json({ message: 'wrong method' });
  }
};
