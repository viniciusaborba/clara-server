import { Either, left, right } from '@/core/either'

import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteUserDTO {
  userId: string
}

type DeleteUserResponseDTO = Either<ResourceNotFoundError, null>

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserDTO): Promise<DeleteUserResponseDTO> {
    const user = await this.usersRepository.findById(userId)

    if (!user) return left(new ResourceNotFoundError())

    await this.usersRepository.delete(userId)

    return right(null)
  }
}
