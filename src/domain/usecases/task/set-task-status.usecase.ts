import TaskRepositoryInterface from "../../interfaces/repositories/task.repository.interface";
import SetTaskStatusUsecaseInterface from '../../interfaces/usecases/task/set-task-status.usecase.interface';
import taskStatus from "../../task-status.enum";

export default class SetTaskStatusUsecase implements SetTaskStatusUsecaseInterface {
    taskRepository: TaskRepositoryInterface
    constructor(taskRepository: TaskRepositoryInterface) {
        this.taskRepository = taskRepository
    }

    async execute(id: string, status: taskStatus): Promise<boolean> {
        const result = await this.taskRepository.updateTask(id, { status });

        return result;
    }
}
