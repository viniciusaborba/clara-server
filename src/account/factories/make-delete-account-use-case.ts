import { PrismaAccountsRepository } from '../repositories/prisma/prisma-accounts-repository'
import { DeleteAccountUseCase } from '../use-cases/delete'

export function makeDeleteAccountUseCase() {
  const prismaAccountsRepository = new PrismaAccountsRepository();
  const useCase = new DeleteAccountUseCase(prismaAccountsRepository);
  
  return useCase;
}
