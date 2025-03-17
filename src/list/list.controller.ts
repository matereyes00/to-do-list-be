import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto/list.dto';

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Get()
   async getLists() {
     return this.listService.getLists();
   }

   @Get(':id')
   async getList(@Param('id') id: number) {
    return this.listService.getList(Number(id)); 
}

    @Post()
    async createList(@Body() dto: ListDto){
        return this.listService.createList(dto.title, dto.itemInList, dto.status);
    }

    @Delete(':id')
    async deleteList(@Param('id') id:number) {
        return this.listService.deleteList(Number(id));
    }
}