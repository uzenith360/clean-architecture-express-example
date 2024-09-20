import ProjectEntity from "../../entities/project.entity";
import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import GetAllProjectsUsecaseInterface from "../../interfaces/usecases/project/get-all-projects.usecase.interface";

export default class GetAllProjectsUsecase implements GetAllProjectsUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(page: number, limit: number): Promise<ProjectEntity[]> {
        const result = await this.projectRepository.getProjects(page, limit);

        return result;
    }
}
