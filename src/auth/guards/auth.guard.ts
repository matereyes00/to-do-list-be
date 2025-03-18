import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthenticatedRequest } from '../dto/auth.req'
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
    //check if jwt token is valid
    constructor(private jwtService: JwtService) {} 
    
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization; // bearer-token
        const token = authorization?.split(' ')[1];

        const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
        console.log('🔍 Checking Authentication...');  
        console.log('🔹 Headers:', req.headers);  // Debugging headers
        console.log('🔹 User:', req.user?.username);  // Should NOT be undefined
        if(!token){
            throw new UnauthorizedException(); // reject the request
        }
        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            await this.jwtService.verifyAsync(token);
            request.user = {
                userId: tokenPayload.sub,
                username: tokenPayload.username
            }
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}