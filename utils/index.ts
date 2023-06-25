import * as E from "fp-ts/lib/Either";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import * as t from 'io-ts';

export function hush<A, B>(v: E.Either<A, B> | null): B | null {
  if (v == null || E.isLeft(v)) return null;
  return v.right;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(user: any): string {
  return jwt.sign(user, process.env.JWT_SECRET || "", { expiresIn: "1d" });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET || "");
}
