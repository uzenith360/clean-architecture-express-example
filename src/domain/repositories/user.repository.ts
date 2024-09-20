
import UserDatasourceInterface from "../../data/interfaces/datasources/user.datasource.interface";
import UserEntity from "../entities/user.entity";
import UserRepositoryInterface from "../interfaces/repositories/user.repository.interface";

export default class UserRepository implements UserRepositoryInterface {
    userDataSource: UserDatasourceInterface
    constructor(userDataSource: UserDatasourceInterface) {
        this.userDataSource = userDataSource;
    }

    updateUser(id: string, user: Partial<UserEntity>): Promise<boolean> {
        return this.userDataSource.updateOne(id, user);
    }

    deleteUser(id: string): Promise<boolean> {
        return this.userDataSource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }

    getUser(id: string): Promise<UserEntity | null> {
        return this.userDataSource.getOne(id);
    }

    createUser(user: UserEntity): Promise<boolean> {
        return this.userDataSource.createOne({ ...user, dateAdded: new Date().toISOString() });
    }

    getUsers(page: number, limit: number): Promise<UserEntity[]> {
        return this.userDataSource.getAll(page, limit);
    }
}
