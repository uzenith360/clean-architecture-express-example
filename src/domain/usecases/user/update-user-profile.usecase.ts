import UserRepositoryInterface from "../../interfaces/repositories/user.repository.interface";
import UserEntity from '../../entities/user.entity';
import UpdateUserProfileUsecaseInterface from '../../interfaces/usecases/user/update-user-profile.usecase.interface';

export default class UpdateUserProfileUsecase implements UpdateUserProfileUsecaseInterface {
    userRepository: UserRepositoryInterface
    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute(id: string, user: Omit<UserEntity, "hash" | "dateAdded">): Promise<boolean> {
        const result = await this.userRepository.updateUser(id, user);

        return result;
    }
}
