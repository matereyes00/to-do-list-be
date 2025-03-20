import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthDtoResult } from './dto/auth.result.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSignUpDto } from './dto/auth.signUp.dto';
import { REFRESH_JWT_SECRET, REFRESH_JWT_EXPIRES_IN } from './configs/refresh-jwt.config';
import { AuthenticatedRequest } from './dto/auth.req';
import * as argon2 from 'argon2'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private userService: UsersService,
    ) {}

    async authenticate(authDto: AuthDto): Promise<AuthDtoResult> {
        const user = await this.validateUser(authDto);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.signIn(user);
    }

    async validateUser(input: AuthDto): Promise<SignInDto | null> {
        const user = await this.prismaService.user.findUnique({
            where: { username: input.username },
        });
        if (user && user.password === input.password) {
            console.log('Password match!'); // Debugging
            return {
                userId: user.userId,
                username: user.username,
            };
        }
        return null;
    }

    async signIn(user: SignInDto): Promise<AuthDtoResult> {
        const tokenPayload = {
            sub: user.userId,
            username: user.username,
        };
        const {accessToken, refreshToken } = await this.generateTokens(tokenPayload.sub);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(tokenPayload.sub, hashedRefreshToken)
        return {
            userId: user.userId,
            username: user.username,
            accessToken,
            refreshToken
        };
    }

    async generateTokens(userId:number) {
        const payload = {sub: userId}
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, {
                secret:REFRESH_JWT_SECRET,
                expiresIn: REFRESH_JWT_EXPIRES_IN
            })
        ]);
        return {
            accessToken,
            refreshToken
        }
    }

    async signOut(userId: number) {
        const user = await this.prismaService.user.findUnique({
            where : {userId}
        })
       await this.userService.updateHashedRefreshToken(userId, '');
       return {
        message: `User ${userId} was logged out`,
        refresh_token: user?.hashedRefreshToken
       }
    }

    async signUp(dto: AuthSignUpDto) {
        const user = this.prismaService.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                password: dto.password,
            },
        });
        return user;
    }
 
    async refreshToken(userId: number) {
        console.log(`[USER ID: ${userId}]`)
        const {accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        console.log(`${hashedRefreshToken} [HASHED TOKEN]`)
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return {
            userId: userId,
            accessToken,
            refreshToken
        };
    }

    async validateRefreshToken(id: number, refreshToken: string) {
        const user = await this.prismaService.user.findUnique({
            where : {userId:id}});
        if (!user || !user.hashedRefreshToken) {
            throw new UnauthorizedException('Invalid Refresh Token');
        }
        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken); // true or false
        if (!refreshTokenMatches) {
            throw new UnauthorizedException("Invalid refresh token");
        }
        return {userId: id};
    }
}
