import { Injectable } from '@nestjs/common';
import { CreateListItemDto } from './dto/create.list.item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ListItemService {
    constructor(
        private prismaService: PrismaService,
    ) {}
    async createListItem( 
        userId : number, 
        itemName: string,
        itemStatus: boolean,
        listId: number,
    ) {
        const list = await this.prismaService.list.findUnique({
            where: {id: listId}
        })
        if (!list) {
            throw new Error('List not found');
        }
        return this.prismaService.listItem.create({
            data: { 
                userId, 
                itemTitle: itemName, 
                itemStatus,
                listId
            }
        })
    }
}
