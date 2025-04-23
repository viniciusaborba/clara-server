import { Account } from '@/entities/accounts'
import { AccountsRepository } from '../accounts-repository'
import { prisma } from '@/lib/prisma'
import { AccountMapper } from '@/account/mapper'

export class PrismaAccountsRepository implements AccountsRepository {
  async findById(accountId: any) {
    const account = await prisma.account.findFirst({
      where: { id: accountId },
    })

    if (!account) return null;

    return AccountMapper.toDomain(account);
  }

  async findByName(name: string, userId: string) {
    const account = await prisma.account.findFirst({
      where: {
        name,
        userId,
      },
    })

    if (!account) return null;

    return AccountMapper.toDomain(account);
  }
  
  async delete(accountId: string): Promise<void> {
    await prisma.account.delete({
      where: { id: accountId }
    })
  }
  async create(data: Account) {
    await prisma.account.create({
      data: AccountMapper.toPrisma(data),
    })
  }
}
