import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchListDto } from './dto/search.list.dto';

@Injectable()
export class ListService {
    constructor(private prismaService: PrismaService) {}

    async getSingleListOfUser(userId: number, listId: number) {
        const listOfUser = await this.prismaService.list.findUnique({
            where: {id:listId, listUserId:userId}  // ✅ Ensure listId is a number
        });
        if (!listOfUser) {
            throw new Error('List not found or does not belong to the user.');
        }
        return {
            listId: listOfUser.id,
            title: listOfUser.title,
        };
    }

    async getUserList() {
        return this.prismaService.list.findMany();
    }

    async createList(
        title: string,
        status: boolean,
        userId: number,
    ) {
        return this.prismaService.list.create({
            data: { title, status, listUserId: userId },
        });
    }
}
