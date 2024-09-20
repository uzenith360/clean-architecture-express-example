export default interface DeleteProjectUsecaseInterface {
    execute(id: string): Promise<boolean>;
}
