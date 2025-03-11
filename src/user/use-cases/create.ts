import { User } from "src/entities/user";
import { UsersRepository } from "../repositories/users-repository";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  username: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = User.create(data);

    await this.usersRepository.create(user);
  }
}
