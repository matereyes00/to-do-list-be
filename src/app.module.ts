import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { PrismaModule } from './prisma/prisma.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ListModule,
    PrismaModule,
  ],
})
export class AppModule {}
