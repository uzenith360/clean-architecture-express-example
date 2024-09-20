import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import RemoveProjectAssigneeUsecaseInterface from "../../interfaces/usecases/project/remove-project-assignee.usecase.interface";

export default class RemoveProjectAssigneeUsecase implements RemoveProjectAssigneeUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(projectId: string, assigneeId: string): Promise<boolean> {
        return this.projectRepository.assignProject(projectId, assigneeId);
    }
}
