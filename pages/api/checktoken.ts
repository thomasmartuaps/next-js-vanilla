/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const checkToken = (req: NextApiRequest, res: NextApiResponse): any => {
  const { token } = req.body;
  const prKey = fs.readFileSync('configJWT/public.pem');
  const algorithms: any = 'HS256';
  verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
    return res.status(200).json({
      message: decoded,
    });
  });
};

export default function tokencheck(
  req: NextApiRequest,
  res: NextApiResponse
): any {
  switch (req.method) {
    case 'GET':
      return res.status(400).json({ message: 'wrong method' });

    case 'POST':
      return checkToken(req, res);

    case 'PUT':
      return res.status(400).json({ message: 'wrong method' });

    case 'DELETE':
      return res.status(400).json({ message: 'wrong method' });

    default:
      return res.status(400).json({ message: 'wrong method' });
  }
}
