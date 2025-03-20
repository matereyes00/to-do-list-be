import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    //check if jwt token is valid
    constructor(private jwtService: JwtService, private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization; // bearer-token
        const token = authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException(); // reject the request
        }
        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.user = {
                userId: tokenPayload.sub,
                username: tokenPayload.username,
            };
            // console.log(request.user)
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
