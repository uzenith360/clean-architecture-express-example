import UserEntity from "../../entities/user.entity";
import UserRepositoryInterface from "../../interfaces/repositories/user.repository.interface";
import CreateUserUsecaseInterface from "../../interfaces/usecases/user/create-user.usecase.interface";

export default class CreateUserUsecase implements CreateUserUsecaseInterface {
    userRepository: UserRepositoryInterface
    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute(user: UserEntity): Promise<boolean> {
        const result = await this.userRepository.createUser(user);

        return result;
    }
}
