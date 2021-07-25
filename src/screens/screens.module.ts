import { Module } from '@nestjs/common';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';
import { screensProviders } from './screens.providers';
import { DatabaseModule } from '../database/database.modules';

@Module({
  imports: [DatabaseModule],
  controllers: [ScreensController],
  providers: [ScreensService, ...screensProviders],
})
export class ScreensModule {}
