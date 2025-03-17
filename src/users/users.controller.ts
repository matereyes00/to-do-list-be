import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
// import { User, List } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  //   @Get(':id')
  //   async getUser(@Param('id') id: number) {
  //     return this.userService.getUser(Number(id));
  //   }

  @Get(':username')
  async getUserByName(@Param('username') user: string) {
    return this.userService.getUserByName(user);
  }

  @Post()
  async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto.email, dto.username, dto.password);
  }
}
