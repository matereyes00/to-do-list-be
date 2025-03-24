import { Module } from '@nestjs/common';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { ListService } from 'src/list/list.service';

@Module({
  imports: [PrismaModule],
  controllers: [ListItemController],
  providers: [ListItemService, ListService]
})
export class ListItemModule {}
