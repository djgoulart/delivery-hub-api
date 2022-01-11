import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {

  async execute({ username, password }: ICreateClient) {
    const clientExists = await prisma.client.findFirst({
      where: {
        username
      }
    });

    if (clientExists) {
      throw new Error("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    const response = await prisma.client.create({
      data: {
        username,
        password: hashPassword
      }
    });

    return response;
  }

}