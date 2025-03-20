import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { AuthService } from '../auth.service';

dotenv.config();

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_JWT_SECRET || 'default_refresh_secret', // ✅ Ensure fallback
      passReqToCallback: true,
      ignoreExpiration:false,
    });
  }

  async validate(req: Request, payload: any) {
    const authHeader = req.get('Authorization') || '';
    const refreshToken = authHeader.replace('Bearer', '').trim();
    const userId = payload.sub
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // return { ...payload, refreshToken };
    return this.authService.validateRefreshToken(userId, refreshToken)
  }
}
