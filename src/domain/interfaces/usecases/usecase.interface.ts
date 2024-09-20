export default interface Usecase {
    execute(): Promise<unknown>;
}
