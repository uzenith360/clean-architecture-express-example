"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    constructor(userDataSource) {
        this.userDataSource = userDataSource;
    }
    updateUser(id, user) {
        return this.userDataSource.updateOne(id, user);
    }
    deleteUser(id) {
        return this.userDataSource.updateOne(id, { dateDeleted: new Date().toISOString() });
    }
    getUser(id) {
        return this.userDataSource.getOne(id);
    }
    createUser(user) {
        return this.userDataSource.createOne(Object.assign(Object.assign({}, user), { dateAdded: new Date().toISOString() }));
    }
    getUsers(page, limit) {
        return this.userDataSource.getAll(page, limit);
    }
}
exports.default = UserRepository;
