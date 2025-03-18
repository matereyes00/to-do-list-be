import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthDtoResult } from './dto/auth.result.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService : JwtService,
        private prisma: PrismaService,
    ) {}
    
    async authenticate(authDto: AuthDto): Promise<AuthDtoResult> { // checks users credentials and generates an access token if validation succeeds.
        const user = await this.validateUser(authDto);
        if (!user) { throw new UnauthorizedException(); }
        return this.signIn(user)
    }
    
    async validateUser(authDto: AuthDto): Promise<SignInDto | null> { //compare username and pw if they match the ones existing sa db
        const user = await this.prisma.user.findUnique({// find user by username
            where: {
                username: authDto.username
            }
        })
        console.log("Found user:", user); // Debugging
        
        if (user && user.password === authDto.password) {
            console.log("Password match!"); // Debugging
            return {
                userId: user.userId, username: user.username,
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
        return {
            accessToken, userId:user.userId, username:user.username
        }
    }
}
