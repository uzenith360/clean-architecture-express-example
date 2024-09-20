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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_and_transform_schema_1 = __importDefault(require("../../../../utils/validate-and-transform-schema"));
const schema_1 = __importDefault(require("./schema"));
const get_router_method_1 = __importDefault(require("../../../../utils/get-router-method"));
const project_status_enum_1 = __importDefault(require("../../../../domain/project-status.enum"));
const task_status_enum_1 = __importDefault(require("../../../../domain/task-status.enum"));
const createProjectHandler = (path, method, createProjectUsecase, router) => __awaiter(void 0, void 0, void 0, function* () {
    (0, get_router_method_1.default)(router, method)(path, (0, validate_and_transform_schema_1.default)(schema_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _a = req.body, { status = project_status_enum_1.default.todo, tasks } = _a, others = __rest(_a, ["status", "tasks"]);
            yield createProjectUsecase.execute(Object.assign(Object.assign({}, others), { status, dateAdded: new Date().toISOString(), tasks: tasks.map((task) => ({
                    title: task,
                    status: task_status_enum_1.default.pending,
                    dateAdded: new Date().toISOString(),
                })) }));
            res.statusCode = 201;
            res.json({ message: "Created" });
        }
        catch (err) {
            res.status(500).send({ message: "Error saving data" });
        }
    }));
});
exports.default = createProjectHandler;
