import TaskEntity from "../../entities/task.entity";

export default interface TaskRepositoryInterface {
    createTask(task: TaskEntity): Promise<boolean>;
    updateTask(id: string, task: Partial<TaskEntity>): Promise<boolean>;
    deleteTask(id: string): Promise<boolean>;
    getTask(id: string): Promise<TaskEntity | null>;
    getTasks(projectId: string): Promise<TaskEntity[]>;
}
