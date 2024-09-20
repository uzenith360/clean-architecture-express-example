export default interface UserEntity {    
    id?: string; 
    email: string;
    firstName: string;
    lastName?: string;
    department: string;
    designation: string;
    isAdmin: boolean;
    hash: string;
    dateAdded: string;
    dateDeleted?: string;
    dateLastActive?: string;
}
