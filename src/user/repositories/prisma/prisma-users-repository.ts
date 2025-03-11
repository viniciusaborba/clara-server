import { User } from "src/entities/user";
import { UsersRepository } from "../users-repository";
import { prisma } from "src/lib/prisma";
import { UserMapper } from "src/user/mapper";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: User)  {
    await prisma.user.create({
      data: UserMapper.toPersistence(data)
    });
  }
  
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) return null;

    return UserMapper.toDomain(user);
  }
}
