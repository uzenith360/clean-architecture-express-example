import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import SetProjectStatusUsecaseInterface from '../../interfaces/usecases/project/set-project-status.usecase.interface';
import projectStatus from "../../project-status.enum";

export default class SetProjectStatusUsecase implements SetProjectStatusUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(id: string, status: projectStatus): Promise<boolean> {
        const result = await this.projectRepository.updateProject(id, { status });

        return result;
    }
}
