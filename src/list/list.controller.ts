import { Controller, Get, Body, Post, UseGuards, Req, Param, Delete, Patch } from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto/list.dto';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { AuthenticatedRequest } from 'src/auth/dto/auth.req';
import { SearchListDto } from './dto/search.list.dto';
import { EditListDto } from './dto/edit.list.dto';
@Controller('list')
@UseGuards(JwtAuthGuard)
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Get(':id')
    async getSingleUserList(@Req() request, @Param('id') id:number) {
        const userId = request.user?.userId
        const listId = Number(id);
        return this.listService.getSingleListOfUser(userId, listId);
    }

    @Get('user_lists')
    async getUserLists(@Req() req: AuthenticatedRequest) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return this.listService.getUserList();
    }

    @Post('create_list')
    async createList(@Req() req: AuthenticatedRequest, @Body() dto: ListDto) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return this.listService.createList(
            dto.title, dto.status, userId,
        );
    }

    @Delete('delete_list/:id')
    async DeleteList(
        @Req() req: AuthenticatedRequest,
        @Param('id') id: number
    ) {
        const userId = req.user?.userId;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        const list_id = Number(id)
        return this.listService.DeleteList(list_id)
    }

    @Patch('edit_list/:id')
    async EditList(
        @Req() req: AuthenticatedRequest,
        @Param('id') id: number,
        @Body() dto: EditListDto
    ) {
        const userId = req.user?.userId;
        const list_id = Number(id)

        if (!userId) {
            throw new Error('User not authenticated');
        }
        if (!(list_id)) {
            throw new Error('Invalid list or item ID');
        }
        return this.listService.EditList(list_id, dto?.title, dto?.status);
    }
}