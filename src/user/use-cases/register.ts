import { User } from "src/entities/user";
import { UsersRepository } from "@/user/repositories/users-repository"
import { Either, left, right } from "@/core/either";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  username: string;
}

type RegisterUserResponseDTO = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserDTO): Promise<RegisterUserResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) return left(new UserAlreadyExistsError(data.email));

    const user = User.create(data);

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
