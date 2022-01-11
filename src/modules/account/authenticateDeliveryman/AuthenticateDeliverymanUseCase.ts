import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string,
  password: string
}

export class AuthenticateDeliverymanUseCase {

  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if (!deliverymanExists) {
      throw new Error("Invalid username or password!");
    }

    const passwordMatch = await compare(password, deliverymanExists.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password!");
    }

    const key = String(process.env.DELIVERYMAN_KEY);

    const token = sign({ username }, key, {
      subject: deliverymanExists.id,
      expiresIn: "1d"
    });

    return {
      token
    };
  }
}