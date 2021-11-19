"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../shared/constants");
var moment = require('moment-timezone');
const ObservacionesAdminSchema = new mongoose_1.Schema({
    admin: { type: mongoose_1.Types.ObjectId, ref: constants_1.SchemaEnum.USER },
    observed_at: { type: String, required: true },
    description: { type: String, required: true },
});
const AreaAdminSchema = new mongoose_1.Schema({
    admin: { type: mongoose_1.Types.ObjectId, ref: constants_1.SchemaEnum.USER },
    area: { type: mongoose_1.Types.ObjectId, ref: constants_1.SchemaEnum.AREA, required: true },
    in_area_at: { type: String, required: true },
});
const DataRequestSchema = new mongoose_1.Schema({
    asunto: { type: String, required: true },
    tipoDoc: { type: String, required: true },
    nomenclatura: { type: String, required: true },
    principal: { type: String, required: true },
    folios: { type: String, required: true },
    observaciones: { type: String },
    anexo: { type: String },
});
exports.RequestSchema = new mongoose_1.Schema({
    created_at: { type: Date, default: Date.now },
    area: [AreaAdminSchema],
    owner: { type: String, ref: 'User' },
    data: DataRequestSchema,
    estado: { type: String, default: constants_1.StateEnum.PENDIENTE },
    rechazado: [
        {
            rechazadoPor: { type: String },
            fecha: { type: Date, default: Date.now },
        },
    ],
    modified_at: [{ type: Date }],
    pdf: { type: String },
    num_serie: { type: String, required: true },
    observacionesRecep: [ObservacionesAdminSchema],
    tenant: { type: String, required: true },
});
exports.RequestSchema.methods.toJSON = function () {
    let data = this.toObject();
    if (data.modified_at) {
        const count = data.modified_at.length;
        if (count > 0) {
            data.modified_at = moment(data.modified_at[count - 1])
                .tz('America/Lima')
                .format('D/MM/YYYY h:mm:ssa');
        }
        if (count == 0) {
            data.modified_at = null;
        }
    }
    data.created_at = moment(data.created_at)
        .tz('America/Lima')
        .format('D/MM/YYYY h:mm:ssa');
    return data;
};
//# sourceMappingURL=document.schema.js.map