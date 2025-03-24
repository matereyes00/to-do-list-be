import { Controller, UseGuards,
    Request,
    Post,
    Param,
    Body,
    Get,
    Req,
    Delete,
    Patch, } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { ListItemService } from './list-item.service';
import { CreateListItemDto } from './dto/create.list.item.dto';
import { AuthenticatedRequest } from 'src/auth/dto/auth.req';
import { EditListItemDto } from './dto/edit.list.item.dto';

@Controller('list-item')
@UseGuards(JwtAuthGuard)
export class ListItemController {
    constructor(
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

    @Patch('editListItem/:list/:id')
    editListItem( 
        @Request() request: AuthenticatedRequest, 
        @Param('list') list: number, 
        @Param('id') id: number, 
        @Body() dto: EditListItemDto) {
        const userId = request.user?.userId;
        const list_id = Number(list)
        const itemId = Number(id)
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return this.listItemService.EditListItem(list_id, itemId, dto.itemName, dto.itemStatus)
    }
}
