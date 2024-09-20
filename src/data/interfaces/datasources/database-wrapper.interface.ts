export default interface DatabaseWrapperInterface { 
    count(...query: unknown[]): Promise<number>
    find(...query: unknown[]): Promise<unknown[]>
    insertOne(data: unknown, ...options: unknown[]): Promise<unknown> 
    findOne(...query: unknown[]): Promise<unknown> 
    updateOne(data: Partial<unknown>, ...options: unknown[]): Promise<unknown> 
    join(definitions?: unknown[], ...options: unknown[]): Promise<unknown>


    // find<T>(...query: unknown[]): Promise<T[]>
    // insertOne<T>(data: T, ...options: unknown[]): Promise<T> 
    // findOne<T>(...query: unknown[]): Promise<T> 
    // updateOne<T>(data: Partial<T>, ...options: unknown[]): Promise<T> 
}
