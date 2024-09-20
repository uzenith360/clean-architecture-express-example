import ProjectEntity from "../../entities/project.entity";
import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import CreateProjectUsecaseInterface from "../../interfaces/usecases/project/create-project.usecase.interface";

export default class CreateProjectUsecase implements CreateProjectUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(project: ProjectEntity): Promise<boolean> {
        const result = await this.projectRepository.createProject(project);

        return result;
    }
}
