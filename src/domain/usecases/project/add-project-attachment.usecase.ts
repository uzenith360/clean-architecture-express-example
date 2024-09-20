import { ProjectAttachmentEntity } from "../../entities/project.entity";
import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import AddProjectAttachmentUsecaseInterface from "../../interfaces/usecases/project/add-project-attachment.usecase.interface";

export default class AddProjectAttachmentUsecase implements AddProjectAttachmentUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(projectId: string, attachment: ProjectAttachmentEntity): Promise<boolean> {
        return this.projectRepository.addAttachment(projectId, attachment);
    }
}
