import UserEntity from "../../../entities/user.entity";

export default interface CreateUserUsecaseInterface {
    execute(user: UserEntity): Promise<boolean>;
}
