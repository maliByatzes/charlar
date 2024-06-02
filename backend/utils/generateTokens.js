import * as jose from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ALGORITHM = process.env.JWT_ALGORITHM ||'HS256';

export const generateAndSetToken = async (userId, res) => {
  const accessToken = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(SECRET);

  const refreshToken = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(SECRET);

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};
