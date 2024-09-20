import UserEntity from "../../entities/user.entity";
import UserRepositoryInterface from "../../interfaces/repositories/user.repository.interface";
import GetAllUsersUsecaseInterface from "../../interfaces/usecases/user/get-all-users.usecase.interface";

export default class GetAllUsersUsecase implements GetAllUsersUsecaseInterface {
    userRepository: UserRepositoryInterface
    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute(page: number, limit: number): Promise<UserEntity[]> {
        const result = await this.userRepository.getUsers(page, limit);

        return result;
    }
}
