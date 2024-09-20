import ProjectEntity from "../../entities/project.entity";
import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import GetProjectUsecaseInterface from "../../interfaces/usecases/project/get-project.usecase.interface";

export default class GetProjectUsecase implements GetProjectUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(id: string): Promise<ProjectEntity | null> {
        const result = await this.projectRepository.getProject(id);

        return result;
    }
}
