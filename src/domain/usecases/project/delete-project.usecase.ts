import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import DeleteProjectUsecaseInterface from "../../interfaces/usecases/project/delete-project.usecase.interface";

export default class DeleteProjectUsecase implements DeleteProjectUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(id: string): Promise<boolean> {
        const result = await this.projectRepository.deleteProject(id);

        return result;
    }
}
