import { User } from "src/entities/user";

export interface UsersRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
