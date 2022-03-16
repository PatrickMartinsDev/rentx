import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing!");
  }

  const [, token] = authHeader.split("")
  try {
    const { sub } = verify(token, "03c48675e9a21dc1f0dc186eb78456b3") as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new Error("User does not exists!")
    }

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}