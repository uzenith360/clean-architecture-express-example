import UserEntity from "../../../entities/user.entity";

export default interface GetUserUsecaseInterface {
    execute(id: string): Promise<UserEntity | null>;
}
