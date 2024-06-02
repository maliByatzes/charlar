import * as jose from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ALGORITHM = process.env.JWT_ALGORITHM ||'HS256';

export const generateAccessToken = async (userId, res) => {
  const accessToken = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(SECRET);

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    maxAge: 1 * 60 * 60 * 1000,
  });
};

export const generateRefreshToken = async (userId, res) => {
  const refreshToken = await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(SECRET);

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export const verifyToken = async (token) => {
  try {
    const { payload } = await jose.jwtVerify(token, SECRET);
    return payload.userId;
  } catch (error) {
    return null;
  }
};
