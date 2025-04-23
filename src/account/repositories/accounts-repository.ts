import { Account } from '@/entities/accounts'

export interface AccountsRepository {
  findByName(name: string, userId: string): Promise<Account | null>
  findById(accountId): Promise<Account | null>
  create(data: Account): Promise<void>
  delete(accountId: string): Promise<void>;
}
