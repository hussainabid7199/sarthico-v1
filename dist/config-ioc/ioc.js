"use-strict";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const UserService_1 = __importDefault(require("../services/UserService"));
const EmailService_1 = __importDefault(require("../services/EmailService"));
const AccountService_1 = __importDefault(require("../services/AccountService"));
const MiscellaneousService_1 = __importDefault(require("../services/MiscellaneousService"));
const VerifyOTPService_1 = __importDefault(require("../services/VerifyOTPService"));
const ServiceService_1 = __importDefault(require("../services/ServiceService"));
const UserServiceMappingService_1 = __importDefault(require("../services/UserServiceMappingService"));
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.IUserService).to(UserService_1.default);
container.bind(types_1.TYPES.IEmailService).to(EmailService_1.default);
container.bind(types_1.TYPES.IAccountService).to(AccountService_1.default);
container.bind(types_1.TYPES.IMiscellaneousService).to(MiscellaneousService_1.default);
container.bind(types_1.TYPES.IVerifyOTPService).to(VerifyOTPService_1.default);
container.bind(types_1.TYPES.IServiceService).to(ServiceService_1.default);
container.bind(types_1.TYPES.IUserServiceMappingService).to(UserServiceMappingService_1.default);
//# sourceMappingURL=ioc.js.map