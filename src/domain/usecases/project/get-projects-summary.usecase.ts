import ProjectStatsInterface from "../../interfaces/project-stats.interface";
import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import GetProjectsSummaryUsecaseInterface from "../../interfaces/usecases/project/get-projects-summary.usecase.interface";

export default class GetProjectsSummaryUsecase implements GetProjectsSummaryUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(startDate?: string, endDate?: string): Promise<ProjectStatsInterface> {
        return this.projectRepository.getStat(startDate, endDate);
    }
}
