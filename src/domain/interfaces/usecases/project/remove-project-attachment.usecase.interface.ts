export default interface RemoveProjectAttachmentUsecaseInterface {
    execute(id: string, projectId: string): Promise<boolean>;
}
