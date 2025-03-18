import { User } from "src/entities/user"
import { User as PrismaUser } from "@prisma/client"

export class UserMapper {
  public static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? null
    }
  }

  public static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined
    }
  }

  public static toDomain(data: PrismaUser) {
    return User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      username: data.username,
    });
  }
}
