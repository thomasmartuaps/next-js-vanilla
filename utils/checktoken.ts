import { verify } from 'jsonwebtoken';

export default (token: any, prKey: any, algorithms: any) => {
  verify(token, prKey, { algorithms }, (err: any, decoded: any) => {
    return decoded;
  });
};
