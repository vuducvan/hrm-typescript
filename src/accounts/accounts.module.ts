import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { DatabaseModule } from '../database/database.modules';
import { accountsProviders } from './accounts.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService, ...accountsProviders],
  exports: [AccountsService],
})
export class AccountsModule {}
