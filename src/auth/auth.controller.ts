import {
    Controller,
    Request,
    HttpCode,
    NotImplementedException,
    Post,
    HttpStatus,
    Body,
    Get,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { AuthSignUpDto } from './dto/auth.signUp.dto';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService) {}

    @Get('getMsg')
    getMessage() {
        return {message: 'Successfully connected nestjs BE to react FE!'}
    }

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
        return this.authService.refreshToken(request.user.userId);
    }

    @Get('me') // only accessible for authenticated users
    @UseGuards(JwtAuthGuard)
    getUserInfo(@Request() request) {
        return this.userService.getUser(request.user.userId);
    }

    @Post('logout')
    @UseGuards(RefreshAuthGuard)
    logout(@Request() request) {
        return this.authService.signOut(request.user.userId)
    }
}
