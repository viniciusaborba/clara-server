import { User } from "src/entities/user";

export interface UsersRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  delete(userId: string): Promise<void>;
  findById(id: string): Promise<User | null>;
}
