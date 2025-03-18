import { Controller, Request, HttpCode, NotImplementedException, Post, HttpStatus, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {

        constructor(private prisma: PrismaService,
            private authService: AuthService, ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() authDto:AuthDto) {
        return this.authService.authenticate(authDto);
    }

    @UseGuards(AuthGuard)
    @Get('me') // only accessible for authenticated users
    getUserInfo(@Request() request) {
        return request.user;
    }
}
