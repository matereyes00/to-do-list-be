import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
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
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    return { ...payload, refreshToken };
  }
}
