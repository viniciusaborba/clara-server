import { Either, left, right } from '@/core/either'
import { AccountsRepository } from '../repositories/accounts-repository'
import { AccountAlreadyExistsError } from './errors/account-alredy-exists'
import { UserNotFoundError } from './errors/user-not-found'
import { Account } from '@/entities/accounts'
import { UsersRepository } from '@/user/repositories/users-repository'
import { Prisma } from '@prisma/client'

interface CreateAccountDTO {
  name: string
  balance: Prisma.Decimal
  userId: string
}

type CreateAccountResponseDTO = Either<
  AccountAlreadyExistsError | UserNotFoundError,
  {
    account: Account
  }
>

export class CreateAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    balance,
    userId,
  }: CreateAccountDTO): Promise<CreateAccountResponseDTO> {
    const accountAlreadyExists = await this.accountsRepository.findByName(
      name,
      userId
    )
    const user = await this.usersRepository.findById(userId)

    if (accountAlreadyExists) return left(new AccountAlreadyExistsError(name))

    if (!user) return left(new UserNotFoundError())

    const account = Account.create({
      name,
      balance,
      userId,
    })

    await this.accountsRepository.create(account)

    return right({
      account,
    })
  }
}
