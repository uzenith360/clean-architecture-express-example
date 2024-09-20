import UserEntity from "../../entities/user.entity";
import UserRepositoryInterface from "../../interfaces/repositories/user.repository.interface";
import GetUserUsecaseInterface from "../../interfaces/usecases/user/get-user.usecase.interface";

export default class GetUserUsecase implements GetUserUsecaseInterface {
    userRepository: UserRepositoryInterface
    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute(id: string): Promise<UserEntity | null> {
        const result = await this.userRepository.getUser(id);

        return result;
    }
}
