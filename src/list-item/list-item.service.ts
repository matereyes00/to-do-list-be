import { Injectable } from '@nestjs/common';
import { CreateListItemDto } from './dto/create.list.item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ListItemService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async getListItems(userId: number, listid:number) {
        return this.prismaService.listItem.findMany({
            where: {listId:listid}
        })
    }

    async createListItem( 
        userId : number, itemName: string,
        itemStatus: boolean, listId: number,
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
    
    async DeleteListItem(userId:number, list_id: number, id:number) {
        console.log(`Received list ID: ${list_id}, item ID: ${id}`);
        const item = await this.prismaService.listItem.findUnique({
            where: {
                itemId: id,  
                listId: list_id
            }
        });
        if (!item) {
            throw new Error(`Item with ID ${id} not found in list ${list_id}`);
        }
        await this.prismaService.listItem.delete({
            where: {
                itemId: id,
            }
        });

        return {message: `Item ${id} from list ${list_id} deleted!`}
    }

    async EditListItem(
        list_id:number, 
        item_id: number, 
        edited_item_title: string,
        edited_item_status: boolean,
    ) {
        const list = await this.prismaService.list.findUnique({
            where: {
                id:list_id
            }
        })

        if (edited_item_title) {
            await this.prismaService.listItem.update({
                where : {itemId:item_id, listId:list_id},
                data : {itemTitle:edited_item_title}
            })
            const msg = `Edited item ${item_id} from list "${list?.title}" to: ${edited_item_title}`
            return {message: msg};
        }
        if (edited_item_status) {
            await this.prismaService.listItem.update({
                where : {itemId:item_id, listId:list_id},
                data : {itemStatus:edited_item_status}
            })
            const msg = `Edited item ${item_id} from list "${list?.title}" to: ${edited_item_status}`
            return {message: msg};
        }
        
        
        return {
            message: `No edits were made.`
        }
    }
}
