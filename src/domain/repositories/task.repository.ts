
import TaskDatasourceInterface from "../../data/interfaces/datasources/task.datasource.interface";
import TaskEntity from "../entities/task.entity";
import TaskRepositoryInterface from "../interfaces/repositories/task.repository.interface";

export default class TaskRepository implements TaskRepositoryInterface {
    taskDataSource: TaskDatasourceInterface
    constructor(taskDataSource: TaskDatasourceInterface) {
        this.taskDataSource = taskDataSource;
    }

    createTask(task: TaskEntity): Promise<boolean> {
        return this.taskDataSource.createOne({ ...task, dateAdded: new Date().toISOString() });
    }

    updateTask(id: string, task: Partial<TaskEntity>): Promise<boolean> {
        return this.taskDataSource.updateOne(id, task);
    }

    deleteTask(id: string): Promise<boolean> {
        return this.taskDataSource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }

    getTask(id: string): Promise<TaskEntity | null> {
        return this.taskDataSource.getOne(id);
    }

    getTasks(projectId: string): Promise<TaskEntity[]> {
        return this.taskDataSource.getAll(projectId, 1, 1000000);
    }
}
