import { Module } from '@nestjs/common';
import { UserrolesController } from './userroles.controller';
import { UserrolesService } from './userroles.service';
import { userrolesProviders } from './userroles.providers';
import { DatabaseModule } from '../database/database.modules';

@Module({
  imports: [DatabaseModule],
  controllers: [UserrolesController],
  providers: [UserrolesService, ...userrolesProviders],
})
export class UserrolesModule {}
