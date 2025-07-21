import { expressjwt } from "express-jwt";
import jwks from "jwks-rsa";
import dotenv from 'dotenv';
dotenv.config();


export const verificarToken = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    handleSigningKeyError: (err, cb) => {
      console.error('JWKS Error:', err)
      cb(err)
    }
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});