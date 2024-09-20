export default interface InitializeForgotUserPasswordUsecaseInterface {
    execute(email: string): Promise<boolean>;
}
