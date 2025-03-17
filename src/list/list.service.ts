import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { List } from '@prisma/client';

@Injectable()
export class ListService {
    constructor(private prisma: PrismaService) {}

    // getLists(): string[] {
    //     return ['Grocery', 'Watchlist', 'Things to finish', 'Bucket List'];
    //   }
    async getLists() {
        return this.prisma.list.findMany()
    }
    
    async getList(id: number) {
        return this.prisma.list.findUnique({ where: { id } });
    }
    
    async createList(title: string, itemsInList: string[], status:boolean) {
        return this.prisma.list.create({ 
            data : { 
                title, itemsInList, status 
            }, });
    }

    async deleteList(id: number) {
        return this.prisma.list.delete({ where: { id } });
    }
}