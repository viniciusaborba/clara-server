import { User } from 'src/entities/user'

import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/user/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateUserDTO {
  name: string
  email: string
  password: string
  phone: string
  username: string
}

type CreateUserResponseDTO = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) return left(new UserAlreadyExistsError(data.email))

    const user = User.create(data)

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
