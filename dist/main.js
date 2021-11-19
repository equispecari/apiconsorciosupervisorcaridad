"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const pipes_1 = require("./modules/shared/pipes");
const filters_1 = require("./modules/shared/filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new pipes_1.ValidationPipe());
    app.useGlobalFilters(new filters_1.HttpExceptionFilter());
    await app.listen(app_module_1.AppModule.port || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map