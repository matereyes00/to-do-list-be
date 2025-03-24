import { Controller, UseGuards,
    Request,
    Post,
    Param,
    Body,
    Get,
    Req,
    Delete, } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { ListService } from 'src/list/list.service';
import { ListItemService } from './list-item.service';
import { CreateListItemDto } from './dto/create.list.item.dto';
import { AuthenticatedRequest } from 'src/auth/dto/auth.req';

@Controller('list-item')
@UseGuards(JwtAuthGuard)
export class ListItemController {
    constructor(
        private listService: ListService, 
        private listItemService: ListItemService) {}

    @Get('getListItems/:id')
    getListItems(@Req() req: AuthenticatedRequest, @Param('id') id:number) {
        const userId = req.user?.userId;
        const listId = Number(id)
        if (!userId) {
            throw new Error('User not authenticated');
        }

        return this.listItemService.getListItems(userId,listId)
    }

    @Post('createListItem')
    createListItem(
        @Request() request: AuthenticatedRequest, 
        @Body() dto: CreateListItemDto) {
        const userId = request.user?.userId;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        
        return this.listItemService.createListItem(
            userId,  dto.itemName, dto.itemStatus ?? false, dto.listId, 
        );
    }

    @Delete('deleteListItem/:list/:id')
    deleteListItem(
        @Request() request: AuthenticatedRequest, 
        @Param('list') list: number, @Param('id') id: number
    ) {
        const userId = request.user?.userId;
        const list_id = Number(list)
        const itemId = Number(id)

        if (!userId) {
            throw new Error('User not authenticated');
        }
        if (!(list_id) || !(itemId)) {
            throw new Error('Invalid list or item ID');
        }
        
        return this.listItemService.DeleteListItem(userId, list_id, itemId);
    }
}
