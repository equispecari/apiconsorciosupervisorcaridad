"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
const interfaces_1 = require("../interfaces");
class ResponseDto {
    static format(code, body, total = null) {
        if (total) {
            return { code, body, total };
        }
        else {
            return { code, body };
        }
    }
}
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map