import { Module } from '@nestjs/common';
import { RolepermissionsController } from './rolepermissions.controller';
import { RolepermissionsService } from './rolepermissions.service';
import { rolepermissionsProviders } from './rolepermissions.providers';
import { DatabaseModule } from '../database/database.modules';

@Module({
  imports: [DatabaseModule],
  controllers: [RolepermissionsController],
  providers: [RolepermissionsService, ...rolepermissionsProviders],
})
export class RolepermissionsModule {}
