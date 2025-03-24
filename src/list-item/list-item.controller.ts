import { Controller, UseGuards,
    Request,
    HttpCode,
    NotImplementedException,
    Post,
    HttpStatus,
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
}
