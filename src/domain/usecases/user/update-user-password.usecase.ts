import { env } from 'process';
import UserRepositoryInterface from "../../interfaces/repositories/user.repository.interface";
import UpdateUserPasswordUsecaseInterface from "../../interfaces/usecases/user/update-user-password.usecase.interface";
import UserEntity from '../../entities/user.entity';
import HashMethods from '../../../utils/hash-methods';

const { SALT_ROUNDS = 10 } = env;

export default class UpdateUserPasswordUsecase implements UpdateUserPasswordUsecaseInterface {
    userRepository: UserRepositoryInterface
    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository
    }

    async execute(id: string, oldPassword: string, newPassword: string): Promise<boolean> {
        //first compare oldpassword with whats in db
        const user: UserEntity | null = await this.userRepository.getUser(id);

        if (!user || !await HashMethods.compareHash(user.hash, oldPassword)) {
            return false;
        }

        const result = await this.userRepository.updateUser(id, { hash: await HashMethods.hash(newPassword, +SALT_ROUNDS) });

        return result;
    }
}
