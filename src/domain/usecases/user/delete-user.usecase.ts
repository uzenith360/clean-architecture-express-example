import UserRepositoryInterface from "../../interfaces/repositories/user.repository.interface";
import DeleteUserUsecaseInterface from "../../interfaces/usecases/user/delete-user.usecase.interface";

export default class DeleteUserUsecase implements DeleteUserUsecaseInterface {
    userRepository: UserRepositoryInterface
    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute(id: string): Promise<boolean> {
        const result = await this.userRepository.deleteUser(id);

        return result;
    }
}
