import UserEntity from "../../../entities/user.entity";

export default interface UpdateUserProfileUsecaseInterface {
    execute(id: string, user: Omit<UserEntity, 'hash' | 'dateAdded'>): Promise<boolean>;
}
