import { Account } from 'src/entities/accounts'
import { Account as PrismaAccount } from '@prisma/client'

export class AccountMapper {
  public static toPrisma(account: Account) {
    return {
      id: account.id,
      name: account.name,
      balance: account.balance,
      userId: account.userId,
    }
  }

  public static toDomain(data: PrismaAccount): Account {
    return new Account({
      id: data.id,
      name: data.name,
      balance: data.balance,
      userId: data.userId,
    })
  }
}
