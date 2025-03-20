import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthDtoResult } from './dto/auth.result.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSignUpDto } from './dto/auth.signUp.dto';
import { REFRESH_JWT_SECRET, REFRESH_JWT_EXPIRES_IN } from './configs/refresh-jwt.config';
import { AuthJwtPayload } from './dto/auth.jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async authenticate(authDto: AuthDto): Promise<AuthDtoResult> {
        const user = await this.validateUser(authDto);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.signIn(user);
    }

    async validateUser(input: AuthDto): Promise<SignInDto | null> {
        const user = await this.prisma.user.findUnique({
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
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        const refreshToken = await this.jwtService.signAsync(tokenPayload, {
            secret:REFRESH_JWT_SECRET,
            expiresIn: REFRESH_JWT_EXPIRES_IN
        });
        return {
            userId: user.userId,
            username: user.username,
            accessToken,
            refreshToken
        };
    }

    async signUp(dto: AuthSignUpDto) {
        const user = this.prisma.user.create({
            data: {
                email: dto.email,
                username: dto.username,
                password: dto.password,
            },
        });
        return user;
    }
 
    async refreshToken(userId: number, username: string) {
        const tokenPayload = { sub: userId, username: username };
        const newAccessToken = this.jwtService.sign(tokenPayload);
        return {
            user_id: userId,
            access_token: newAccessToken
        };
    }
}
