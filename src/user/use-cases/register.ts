import { User } from "src/entities/user";
import { UsersRepository } from "@/user/repositories/users-repository"
import { Either, left, right } from "@/core/either";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";
import { UsernameAlreadyInUseError } from "./errors/username-already-in-use";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  username: string;
}

type RegisterUserResponseDTO = Either<
  UserAlreadyExistsError | UsernameAlreadyInUseError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password, phone, username }: CreateUserDTO): Promise<RegisterUserResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    const usernameAlreadyInUse = await this.usersRepository.findByUsername(username)

    const hasPassword = password ? await hash(password, 6) : null

    if (userAlreadyExists) return left(new UserAlreadyExistsError(email));
  
    if (usernameAlreadyInUse) return left(new UsernameAlreadyInUseError(username))

    const user = User.create({
      email,
      phone,
      username,
      name,
      password: hasPassword
    });

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
