import { Controller, Get, Param, Body, Post, Delete, UseGuards, Req } from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto/list.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';
import { AuthenticatedRequest } from 'src/auth/dto/auth.req';
@Controller('list')
@UseGuards(AuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

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
    return this.listService.createList(dto.title, dto.itemsInList, dto.status, userId);
  }
}
