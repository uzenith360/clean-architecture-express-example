export default interface FinalizeForgotUserPasswordUsecaseInterface {
    execute(email: string, otpCode: string): Promise<boolean>;
}
