import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class DeleteListItemDto {
    @IsNotEmpty()
    listId: number;
}