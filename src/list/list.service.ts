import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async getUserList() {
    return this.prisma.list.findMany();
  }

  async createList(
    title: string,
    itemsInList: string[],
    status: boolean,
    userId: number,
  ) {
    return this.prisma.list.create({
      data: { title, items: itemsInList, status, listUserId: userId },
    });
  }
}
