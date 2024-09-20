"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoDBDatabase {
    constructor(init, collectionName) {
        if (init instanceof mongodb_1.Db) {
            this.db = init;
            this.collection = init.collection(collectionName);
        }
        else {
            this.connectionString = init.connectionString;
            this.collectionName = collectionName;
            this.dbName = init.dbName;
        }
    }
    count(filter, options) {
        return this.collection.countDocuments(filter, options);
    }
    find(filter, options) {
        return this.collection.find(filter, options).toArray();
    }
    insertOne(doc, options) {
        return this.collection.insertOne(doc, options);
    }
    findOne(filter, options) {
        return this.collection.findOne(filter, options);
    }
    updateOne(filter, update, options) {
        return this.collection.updateOne(filter, update, options);
    }
    join(pipeline, options) {
        return this.collection.aggregate(pipeline, options).toArray();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!this.db) {
                return this.db;
            }
            const client = new mongodb_1.MongoClient(this.connectionString);
            try {
                yield client.connect();
                this.db = client.db(this.dbName);
                this.collection = this.db.collection(this.collectionName);
                return this.db;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
}
exports.default = MongoDBDatabase;
