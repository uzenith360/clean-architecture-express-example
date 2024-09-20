import taskStatus from "../../../task-status.enum";

export default interface SetTaskStatusUsecaseInterface {
    execute(id: string, status: taskStatus): Promise<boolean>;
}
