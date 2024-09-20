import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import AddProjectAssigneeUsecaseInterface from "../../interfaces/usecases/project/add-project-assignee.usecase.interface";

export default class AddProjectAssigneeUsecase implements AddProjectAssigneeUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(projectId: string, assigneeId: string): Promise<boolean> {
        return this.projectRepository.assignProject(projectId, assigneeId);
    }
}
