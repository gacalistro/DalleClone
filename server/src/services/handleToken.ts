import * as jose from "jose";

type generateTokenProps = {
  id: string;
  name: string;
  email: string;
};

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function generateToken({ id, name, email }: generateTokenProps) {
  return await new jose.SignJWT({
    id,
    name,
    email,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime("1h")
    .sign(secret);
}

export async function validateToken(authorizationToken: string) {
  const [, token] = authorizationToken.split(" ");

  return await jose.jwtVerify(token, secret);
}
