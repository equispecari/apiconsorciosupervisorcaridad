"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AreaSchema = new mongoose_1.Schema({
    area: { type: String, required: true },
    encargado: { type: String, required: true },
    dni: { type: String, required: true },
    especialidad: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    tenant: { type: String, required: true },
});
//# sourceMappingURL=area.schema.js.map