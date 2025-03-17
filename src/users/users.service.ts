import { Injectable } from '@nestjs/common';
// import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  //   async getUser(userId: number) {
  //     return this.prisma.user.findUnique({ where: { userId } });
  //   }

  async getUserByName(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async createUser(email: string, username: string, password: string) {
    return this.prisma.user.create({
      data: { email, username, password },
    });
  }
}
