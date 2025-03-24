import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ListItemModule } from './list-item/list-item.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ListModule,
        PrismaModule,
        UsersModule,
        AuthModule,
        ListItemModule,
    ],
})
export class AppModule {}
