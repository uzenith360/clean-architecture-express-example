import ProjectStatsInterface from "../../interfaces/project-stats.interface";
import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import GetProjectsStatsUsecaseInterface from "../../interfaces/usecases/project/get-projects-stats.usecase.interface";

export default class GetProjectsStatsUsecase implements GetProjectsStatsUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(): Promise<ProjectStatsInterface> {
        return this.projectRepository.getStat();
    }
}
