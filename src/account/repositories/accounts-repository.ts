import { Account } from '@/entities/accounts'

export interface AccountsRepository {
  create(data: Account): Promise<void>
  findByName(name: string, userId: string): Promise<Account | null>
}
