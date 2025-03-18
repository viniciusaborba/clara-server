import { User } from "src/entities/user";
import { UsersRepository } from "@/user/repositories/users-repository"
import { Either, left, right } from "@/core/either";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";

interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  username: string;
}

type RegisterUserResponseDTO = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ 
    email, 
    name, 
    password, 
    phone, 
    username 
  }: RegisterUserDTO): Promise<RegisterUserResponseDTO> {
    const password_hash = password ? await hash(password, 6) : null;
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) return left(new UserAlreadyExistsError(email));

    const user = User.create({
      email,
      phone,
      username,
      name,
      password: password_hash,
    });

    await this.usersRepository.create(user);

    return right({
      user
    })
  }
}
