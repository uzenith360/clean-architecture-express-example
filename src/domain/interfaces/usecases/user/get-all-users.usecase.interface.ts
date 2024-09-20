import UserEntity from "../../../entities/user.entity";

export default interface GetAllUsersUsecaseInterface {
    execute(page: number, limit: number): Promise<UserEntity[]>;
}
