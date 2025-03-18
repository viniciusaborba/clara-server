import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository"
import { RegisterUserUseCase } from "../use-cases/register"

export function makeRegisterUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(prismaUsersRepository)

  return useCase
}
