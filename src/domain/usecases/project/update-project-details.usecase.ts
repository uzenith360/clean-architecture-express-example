import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import ProjectEntity from '../../entities/project.entity';
import UpdateProjectDetailsUsecaseInterface from '../../interfaces/usecases/project/update-project-details.usecase.interface';

export default class UpdateProjectDetailsUsecase implements UpdateProjectDetailsUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(id: string, project: Omit<ProjectEntity, "hash" | "dateAdded">): Promise<boolean> {
        const result = await this.projectRepository.updateProject(id, project);

        return result;
    }
}
