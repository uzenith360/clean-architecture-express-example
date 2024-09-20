import ProjectRepositoryInterface from "../../interfaces/repositories/project.repository.interface";
import RemoveProjectAttachmentUsecaseInterface from "../../interfaces/usecases/project/remove-project-attachment.usecase.interface";

export default class RemoveProjectAttachmentUsecase implements RemoveProjectAttachmentUsecaseInterface {
    projectRepository: ProjectRepositoryInterface
    constructor(projectRepository: ProjectRepositoryInterface) {
        this.projectRepository = projectRepository
    }

    async execute(projectId: string, attachmentId: string): Promise<boolean> {
        return this.projectRepository.removeAttachment(projectId, attachmentId);
    }
}
