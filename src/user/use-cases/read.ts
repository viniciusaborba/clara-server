import { Either, left, right } from '@/core/either'
import { User } from '@/entities/user'

import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ReadUserDTO {
  userId: string
}

type ReadUserResponseDTO = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class ReadUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: ReadUserDTO): Promise<ReadUserResponseDTO> {
    const user = await this.usersRepository.findById(userId)

    if (!user) return left(new ResourceNotFoundError())

    return right({
      user,
    })
  }
}
