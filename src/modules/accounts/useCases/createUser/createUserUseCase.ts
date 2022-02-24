import { inject } from "tsyringe";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersrepository";

class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { };

  async execute({ name, username, email, driver_license, password }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      email,
      driver_license,
      password
    })
  }
}

export { CreateUserUseCase };