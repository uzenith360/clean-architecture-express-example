export default interface DeleteUserUsecaseInterface {
    execute(id: string): Promise<boolean>;
}
