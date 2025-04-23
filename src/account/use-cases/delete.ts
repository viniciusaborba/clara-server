import { Either, left, right } from "@/core/either";
import { AccountsRepository } from "../repositories/accounts-repository";
import { ResourceNotFoundError } from "@/user/use-cases/errors/resource-not-found-error";

interface DeleteAccountDTO {
  accountId: string;
}

type DeleteAccountResponseDTO = Either<
  ResourceNotFoundError, null
>

export class DeleteAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({ accountId }: DeleteAccountDTO): Promise<DeleteAccountResponseDTO> {
    const account = await this.accountsRepository.findById(accountId);

    if (!account) return left(new ResourceNotFoundError());

    await this.accountsRepository.delete(accountId);

    return right(null);
  };
}
