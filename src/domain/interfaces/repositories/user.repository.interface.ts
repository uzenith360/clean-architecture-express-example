import UserEntity from "../../entities/user.entity";

export default interface UserRepositoryInterface {
    createUser(user: UserEntity): Promise<boolean>;
    updateUser(id: string, user: Partial<UserEntity>): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
    getUser(id: string): Promise<UserEntity | null>;
    getUsers(page: number, limit: number): Promise<UserEntity[]>;
}
