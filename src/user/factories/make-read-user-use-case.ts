import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { ReadUserUseCase } from '../use-cases/read'

export function makeReadUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new ReadUserUseCase(prismaUsersRepository)

  return useCase
}
