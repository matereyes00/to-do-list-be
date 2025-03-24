import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchListDto } from './dto/search.list.dto';

@Injectable()
export class ListService {
    constructor(private prismaService: PrismaService) {}

    async getSingleListOfUser(userId: number, listId: number) {
        const listOfUser = await this.prismaService.list.findUnique({
            where: {id:listId, listUserId:userId}  
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

    async DeleteList(listId:number) {
        const list = await this.prismaService.list.findUnique({
            where: {
                id:listId
            }
        })
        
        await this.prismaService.list.delete({
            where : { id: listId}
        })
        
        return {
            message: `List [${list?.title}] was deleted`
        }
    }

    async EditList(listId:number, 
        edited_list_title:string,
        edited_list_status:boolean,
    ) {
        const list = await this.prismaService.list.findUnique({
            where : {
                id: listId
            }
        })
        if(edited_list_status) {
            await this.prismaService.list.update({
                where : {id:listId},
                data : {status:edited_list_status}
            })
            const msg = `Edited title of ${list?.id} to "${list?.status}"`
            return { message: msg}
        } else if (edited_list_title) {
            await this.prismaService.list.update({
                where : {id:listId},
                data : {title:edited_list_title}
            })
            const msg = `Edited title of ${list?.id} to "${list?.title}"`
            return { message: msg};
        }
        return {
            message: `No edits to ${list?.title} were made.`
        }
    }
}
