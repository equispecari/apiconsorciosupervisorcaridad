"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationRepository = void 0;
const common_1 = require("@nestjs/common");
class OperationRepository {
    constructor(entityModel) {
        this.entityModel = entityModel;
    }
    async getOne(id) {
        const entity = await this.entityModel.findById(id).exec();
        return entity ? entity : null;
    }
    async getPage(page, limit) {
        const data = await this.entityModel
            .find({})
            .skip(page * limit)
            .limit(limit)
            .exec();
        const total = await this.entityModel.countDocuments({}).exec();
        return { data, total };
    }
    async update(id, entity) {
        const findEntity = await this.entityModel
            .findByIdAndUpdate(id, entity, { new: true })
            .exec();
        return findEntity ? findEntity : null;
    }
    async delete(id) {
        const deletedEntity = await this.entityModel
            .findByIdAndDelete(id, { new: true })
            .exec();
        return deletedEntity ? deletedEntity : null;
    }
    async list(options = {
        where: {},
        relations: [],
        filters: {},
    }) {
        const query = this.entityModel.find(options.where, options.relations, options.filters);
        options.relations.forEach((relation) => {
            query.populate(relation);
        });
        try {
            const data = await query.exec();
            return data;
        }
        catch (error) {
            throw new common_1.UnprocessableEntityException("Populated don't works!");
        }
    }
    async create(entity) {
        try {
            const newEntity = new this.entityModel(entity);
            await newEntity.save();
            return newEntity;
        }
        catch (error) {
            if (error.name === 'MongoServerError' && error.code === 11000) {
                throw new common_1.UnprocessableEntityException('Duplicate key Error! ');
            }
        }
    }
}
exports.OperationRepository = OperationRepository;
//# sourceMappingURL=base.repository.js.map