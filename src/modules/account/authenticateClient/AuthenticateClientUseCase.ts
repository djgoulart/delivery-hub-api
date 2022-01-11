import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string,
  password: string
}

export class AuthenticateClientUseCase {

  async execute({ username, password }: IAuthenticateClient) {
    const clientExists = await prisma.client.findFirst({
      where: {
        username
      }
    });

    if (!clientExists) {
      throw new Error("Invalid username or password!");
    }

    const passwordMatch = await compare(password, clientExists.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password!");
    }

    const key = String(process.env.APP_KEY);

    const token = sign({ username }, key, {
      subject: clientExists.id,
      expiresIn: "1d"
    });

    return {
      token
    };
  }
}