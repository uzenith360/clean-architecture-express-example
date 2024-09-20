export default interface UpdateUserPasswordUsecaseInterface {
    execute(id: string, oldPassword: string, newPassword: string): Promise<boolean>;
}
