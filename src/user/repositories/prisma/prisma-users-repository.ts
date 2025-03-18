import { User } from 'src/entities/user'
import { prisma } from 'src/lib/prisma'
import { UserMapper } from 'src/user/mapper'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) return null

    return UserMapper.toDomain(user)
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) return null

    return UserMapper.toDomain(user)
  }

  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId },
    })
  }

  async create(data: User) {
    await prisma.user.create({
      data: UserMapper.toPrisma(data),
    })
  }
}
