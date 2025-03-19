import { Either, left, right } from "@/core/either";
import { User } from "@/entities/user";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UsersRepository } from "../repositories/users-repository";


interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    user: User;
  }
>;

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) return left(new InvalidCredentialsError());

    if (!user.password) return left(new InvalidCredentialsError());

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return right({
      user,
    });
  }
}