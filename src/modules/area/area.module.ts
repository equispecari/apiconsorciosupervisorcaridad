import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AreaSchema } from './schemas/area.schema';
import { SchemaEnum } from '@shared/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SchemaEnum.AREA, schema: AreaSchema }]),
  ],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
