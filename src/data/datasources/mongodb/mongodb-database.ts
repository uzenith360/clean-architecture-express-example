import { AggregateOptions, Collection, CountDocumentsOptions, Db, Document, Filter, FindOptions, InsertOneOptions, InsertOneResult, MongoClient, OptionalId, UpdateFilter, UpdateOptions, UpdateResult, WithId } from 'mongodb'
import DatabaseWrapperInterface from '../../interfaces/datasources/database-wrapper.interface';

export default class MongoDBDatabase implements DatabaseWrapperInterface {
    private collection!: Collection<Document>;
    private connectionString!: string;
    private dbName!: string;
    private collectionName!: string;
    private db!: Db;

    constructor(init: Db | { connectionString: string, dbName: string }, collectionName: string) {
        if (init instanceof Db) {
            this.db = init;
            this.collection = init.collection(collectionName);
        } else {
            this.connectionString = init.connectionString;
            this.collectionName = collectionName;
            this.dbName = init.dbName;
        }
    }

    count(filter?: Filter<Document> | undefined, options?: CountDocumentsOptions): Promise<number> {
        return this.collection.countDocuments(filter, options);
    }

    find(filter: Filter<Document>, options?: FindOptions): Promise<WithId<Document>[]> {
        return this.collection.find(filter, options).toArray();
    }

    insertOne(doc: OptionalId<Document>, options?: InsertOneOptions): Promise<InsertOneResult<Document>> {
        return this.collection.insertOne(doc, options);
    }

    findOne(filter: Filter<Document>, options: FindOptions): Promise<WithId<Document> | null> {
        return this.collection.findOne(filter, options);
    }

    updateOne(filter: Filter<Document>, update: Document[] | UpdateFilter<Document>, options?: UpdateOptions): Promise<UpdateResult<Document>> {
        return this.collection.updateOne(filter, update, options);
    }

    join(pipeline?: Document[], options?: AggregateOptions): Promise<Document[]> {
        return this.collection.aggregate(pipeline, options).toArray();
    }

    async connect(): Promise<Db> {
        if (!!this.db) {
            return this.db;
        }

        const client: MongoClient = new MongoClient(this.connectionString)

        try {
            await client.connect();

            this.db = client.db(this.dbName)
            this.collection = this.db.collection(this.collectionName);

            return this.db;
        } catch (e) {
            console.error(e);

            throw e;
        }
    }
}
