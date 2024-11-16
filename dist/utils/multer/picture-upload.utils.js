"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pictureStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder = 'public/uploads';
        if (file.fieldname === 'profilePicture') {
            destinationFolder += '/profile-picture';
        }
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        const extname = path.extname(originalname);
        const basename = path.basename(originalname, extname);
        let destinationFolder = 'public/uploads';
        if (file.fieldname === 'profilePicture') {
            destinationFolder += '/profile-picture';
        }
        // Function to generate a unique filename
        const generateUniqueFilename = (basename, extname, index) => {
            const newIndex = index > 0 ? `-${index}` : '';
            return `${basename}${newIndex}${extname}`;
        };
        let index = 0;
        let newFilename = originalname;
        // Loop to check for filename uniqueness
        while (fs.existsSync(path.join(destinationFolder, newFilename))) {
            index++;
            newFilename = generateUniqueFilename(basename, extname, index);
        }
        cb(null, newFilename);
    },
});
const pictureUpload = (0, multer_1.default)({
    storage: pictureStorage,
    fileFilter(req, file, callback) {
        if (!file.mimetype.startsWith('image/')) {
            callback(null, false);
            return callback(new Error('Only image file is allowed'));
        }
        else {
            if (file.fieldname === 'profilePicture') {
                return callback(null, true);
            }
            else {
                return callback(null, false);
            }
        }
    },
    limits: {
        fileSize: 1 * 1012 * 1024, //1 mb
    },
}).any();
exports.default = pictureUpload;
//# sourceMappingURL=picture-upload.utils.js.map