export default interface RemoveProjectAssigneeUsecaseInterface {
    execute(id: string, assigneeId: string): Promise<boolean>;
}
