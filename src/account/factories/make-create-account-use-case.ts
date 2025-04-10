import { PrismaUsersRepository } from '@/user/repositories/prisma/prisma-users-repository'
import { PrismaAccountsRepository } from '../repositories/prisma/prisma-accounts-repository'
import { CreateAccountUseCase } from '../use-cases/create'

export function makeCreateAccountUseCase() {
  const prismaAccountsRepository = new PrismaAccountsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()

  const useCase = new CreateAccountUseCase(
    prismaAccountsRepository,
    prismaUsersRepository
  )

  return useCase
}
