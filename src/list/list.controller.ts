import { Controller, Get, Body, Post, UseGuards, Req, Param } from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto/list.dto';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';
import { AuthenticatedRequest } from 'src/auth/dto/auth.req';
import { SearchListDto } from './dto/search.list.dto';
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
}
