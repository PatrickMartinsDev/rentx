import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    console.log(id);

    const avatar_file = request.file;
    if (!avatar_file) {
      throw new AppError("Avatar doesn't exists")
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_File: avatar_file.filename })

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };