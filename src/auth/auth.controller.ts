import { Controller, Request, HttpCode, NotImplementedException, Post, HttpStatus, Body, Get, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoResult } from './dto/auth.result.dto';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from './guards/auth.guard'
import {AuthSignUpDto} from './dto/auth.signUp.dto'

@Controller('auth')
export class AuthController {

    constructor(private prisma: PrismaService,
            private authService: AuthService, ) {}

    @Post('signUp')
    signUp(@Body() authSignUpDto: AuthSignUpDto) {
        return this.authService.signUp(authSignUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('login')
    login(@Body() authDto:AuthDto) {
        return this.authService.authenticate(authDto);
    }

    @Delete('logout')
    @UseGuards(AuthGuard)
    logout(@Body() authDto:AuthDtoResult) {
        return this.authService.signOut(authDto);
    }

    @UseGuards(AuthGuard)
    @Get('me') // only accessible for authenticated users
    getUserInfo(@Request() request) {
        return request.user;
    }
}
