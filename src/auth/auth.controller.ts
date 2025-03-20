import {
    Controller,
    Request,
    HttpCode,
    NotImplementedException,
    Post,
    HttpStatus,
    Body,
    Get,
    Req,
    UseGuards,
    Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoResult } from './dto/auth.result.dto';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { AuthSignUpDto } from './dto/auth.signUp.dto';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signUp')
    signUp(@Body() authSignUpDto: AuthSignUpDto) {
        return this.authService.signUp(authSignUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() authDto: AuthDto) {
        return this.authService.authenticate(authDto);
    }

    @Post('refresh')
    @UseGuards(RefreshAuthGuard)
    refreshToken(@Request() request) {
        return this.authService.refreshToken(request.user.sub, request.user.username);
    }

    @Get('me') // only accessible for authenticated users
    @UseGuards(JwtAuthGuard)
    getUserInfo(@Request() request) {
        return request.user;
    }
}
