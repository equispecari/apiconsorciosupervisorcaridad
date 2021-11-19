"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioSchema = void 0;
const mongoose_1 = require("mongoose");
exports.HorarioSchema = new mongoose_1.Schema({
    0: {
        active: { type: Boolean, default: false },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '13:00:00' },
    },
    1: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
    },
    2: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
    },
    3: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
    },
    4: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
    },
    5: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '17:30:00' },
    },
    6: {
        active: { type: Boolean, default: true },
        inicio: { type: String, default: '08:30:00' },
        fin: { type: String, default: '13:00:00' },
    },
});
//# sourceMappingURL=horario.schema.js.map