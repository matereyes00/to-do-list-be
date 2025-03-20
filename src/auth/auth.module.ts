import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JWT_SECRET, JWT_SECRET_EXPIRES_IN } from './configs/jwt-secret';
import { REFRESH_JWT_SECRET, REFRESH_JWT_EXPIRES_IN } from './configs/refresh-jwt.config';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
    controllers: [AuthController, PassportAuthController],
    providers: [AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
    imports: [
        UsersModule,
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: { expiresIn: JWT_SECRET_EXPIRES_IN },
        }),
        PassportModule,
    ],
})
export class AuthModule {}
